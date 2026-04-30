import { createAdminClient } from '@/lib/supabase-admin';

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPES = ['https://www.googleapis.com/auth/webmasters'];

export function getOAuthAuthorizationUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/gsc/callback`,
    response_type: 'code',
    scope: SCOPES.join(' '),
    state,
    access_type: 'offline',
    prompt: 'consent', // Force consent to get refresh token
  });

  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

export async function exchangeCodeForTokens(code: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
}> {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET!,
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/gsc/callback`,
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(`OAuth token exchange failed: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
  };
}

export async function refreshAccessToken(refreshToken: string): Promise<{
  access_token: string;
  expires_in: number;
}> {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET!,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }).toString(),
  });

  if (!response.ok) {
    throw new Error(`Token refresh failed: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    access_token: data.access_token,
    expires_in: data.expires_in,
  };
}

export async function saveTokens(
  userId: string,
  accessToken: string,
  refreshToken: string,
  expiresIn: number
): Promise<void> {
  const supabase = createAdminClient();

  const expiresAt = new Date(Date.now() + expiresIn * 1000);

  const { error } = await supabase.from('gsc_tokens').upsert(
    {
      user_id: userId,
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_at: expiresAt.toISOString(),
      site_url: process.env.NEXT_PUBLIC_SITE_URL!,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' }
  );

  if (error) throw error;
}

export async function getValidAccessToken(userId: string): Promise<string> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('gsc_tokens')
    .select('access_token, refresh_token, expires_at')
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    throw new Error('No GSC tokens found. Please authorize first.');
  }

  const expiresAt = new Date(data.expires_at).getTime();
  const now = Date.now();
  const bufferMs = 5 * 60 * 1000; // Refresh 5 minutes before expiry

  if (now + bufferMs > expiresAt) {
    // Token expired or expiring soon, refresh it
    try {
      const { access_token, expires_in } = await refreshAccessToken(
        data.refresh_token
      );
      await saveTokens(userId, access_token, data.refresh_token, expires_in);
      return access_token;
    } catch (err) {
      throw new Error(
        'Failed to refresh GSC token. Please re-authorize at /admin/gsc-settings'
      );
    }
  }

  return data.access_token;
}

export async function clearTokens(userId: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from('gsc_tokens').delete().eq('user_id', userId);
  if (error) throw error;
}
