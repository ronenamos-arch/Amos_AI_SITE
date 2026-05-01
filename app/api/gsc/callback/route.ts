import { exchangeCodeForTokens, saveTokens } from '@/lib/gsc/oauth';
import { createClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const error = searchParams.get('error');

  // Handle authorization errors
  if (error) {
    return NextResponse.redirect(
      new URL(`/admin/gsc-settings?error=${error}`, request.nextUrl.origin)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL('/admin/gsc-settings?error=missing_params', request.nextUrl.origin)
    );
  }

  try {
    // Decode and verify state
    const stateData = JSON.parse(Buffer.from(state, 'base64').toString());
    const userId = stateData.userId;

    // Verify user is authenticated
    const supabase = await createClient();
    const { data } = await supabase.auth.getSession();

    if (!data.session?.user.id || data.session.user.id !== userId) {
      return NextResponse.redirect(
        new URL('/admin/gsc-settings?error=unauthorized', request.nextUrl.origin)
      );
    }

    // Exchange code for tokens
    const { access_token, refresh_token, expires_in } =
      await exchangeCodeForTokens(code);

    // Save tokens to database
    await saveTokens(userId, access_token, refresh_token, expires_in);

    return NextResponse.redirect(
      new URL('/admin/gsc-settings?success=true', request.nextUrl.origin)
    );
  } catch (error) {
    console.error('GSC OAuth callback error:', error);
    return NextResponse.redirect(
      new URL('/admin/gsc-settings?error=token_exchange_failed', request.nextUrl.origin)
    );
  }
}
