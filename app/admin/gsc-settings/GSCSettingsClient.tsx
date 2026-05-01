'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface GSCSettingsClientProps {
  hasTokens: boolean;
}

export default function GSCSettingsClient({ hasTokens: initialHasTokens }: GSCSettingsClientProps) {
  const searchParams = useSearchParams();
  const [hasTokens, setHasTokens] = useState(initialHasTokens);
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const success = searchParams.get('success');
    const error = searchParams.get('error');

    if (success === 'true') {
      setHasTokens(true);
      setStatus('success');
      setMessage('✓ GSC authorization successful! You can now pull performance data.');
    } else if (error) {
      setStatus('error');
      const errorMessages: Record<string, string> = {
        unauthorized: 'Authorization failed: session mismatch',
        missing_params: 'Authorization failed: missing parameters',
        token_exchange_failed: 'Failed to exchange authorization code for tokens',
      };
      setMessage(errorMessages[error] || `Authorization failed: ${error}`);
    }
  }, [searchParams]);

  const handleAuthorize = async () => {
    setIsAuthorizing(true);
    try {
      // Redirect to auth endpoint which will redirect to Google
      window.location.href = '/api/gsc/auth';
    } catch (err) {
      setIsAuthorizing(false);
      setStatus('error');
      setMessage('Failed to start authorization');
    }
  };

  return (
    <div className="space-y-6">
      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
          {message}
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
          {message}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
        <p className="font-semibold mb-2">What you'll get:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Performance data (clicks, impressions, CTR, position)</li>
          <li>Top search queries and pages</li>
          <li>Crawl stats and index status</li>
          <li>Ability to submit URLs for indexing</li>
        </ul>
      </div>

      {!hasTokens ? (
        <button
          onClick={handleAuthorize}
          disabled={isAuthorizing}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition"
        >
          {isAuthorizing ? 'Redirecting to Google...' : 'Authorize with Google'}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">
              ✓ Your GSC account is authorized. You can now pull data programmatically.
            </p>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 text-sm font-mono text-gray-700 overflow-auto">
            <p className="font-bold mb-2">Example: Pull performance data</p>
            <pre>{`import { GSCClient } from '@/lib/gsc/client';

const client = new GSCClient(userId);
const perf = await client.getPerformance(
  'https://www.ronenamoscpa.co.il/',
  '2026-04-01',
  '2026-04-29'
);

console.log({
  clicks: perf.clicks,
  impressions: perf.impressions,
  ctr: perf.ctr + '%',
  position: perf.position,
});`}</pre>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 text-sm font-mono text-gray-700 overflow-auto">
            <p className="font-bold mb-2">Example: Get top search queries</p>
            <pre>{`const topQueries = await client.getTopQueries(
  'https://www.ronenamoscpa.co.il/',
  '2026-04-01',
  '2026-04-29',
  10
);

topQueries.forEach(q => {
  console.log(\`\${q.query}: \${q.clicks} clicks\`);
});`}</pre>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-600 mb-4">
              To revoke access, visit{' '}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Account permissions
              </a>{' '}
              and remove this app.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
