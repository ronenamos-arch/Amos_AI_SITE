import { createClient } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import GSCSettingsClient from './GSCSettingsClient';

export const metadata = {
  title: 'Google Search Console',
  robots: { index: false },
};

export default async function GSCSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    redirect('/login');
  }

  // Check if tokens exist
  const { data: tokens } = await supabase
    .from('gsc_tokens')
    .select('*')
    .eq('user_id', data.session.user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-2">Google Search Console</h1>
        <p className="text-gray-600 mb-8">
          Connect your GSC account to pull performance data, submit URLs, and track crawl
          stats.
        </p>

        <GSCSettingsClient hasTokens={!!tokens} />
      </div>
    </div>
  );
}
