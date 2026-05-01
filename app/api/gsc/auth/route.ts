import { getOAuthAuthorizationUrl } from '@/lib/gsc/oauth';
import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  if (!session?.user.id) {
    redirect('/login?next=/admin/gsc-settings');
  }

  // Generate random state for CSRF protection
  const state = Buffer.from(JSON.stringify({ userId: session.user.id })).toString(
    'base64'
  );

  const authUrl = getOAuthAuthorizationUrl(state);
  redirect(authUrl);
}
