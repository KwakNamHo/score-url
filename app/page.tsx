// app/page.tsx
'use client';

import { useState } from 'react';
import IntroSection from './components/IntroSection';
import UrlInputForm from './components/UrlInputForm';
import ResultCard from './components/ResultCard';
import { ScanResult } from '@/lib/types';

export default function HomePage() {
  const [result, setResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (url: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage =
          data.error || data.detail || '분석 중 오류가 발생했습니다.';

        if (response.status === 401) {
          setError('로그인이 필요합니다. 먼저 로그인해주세요.');
        } else {
          setError(`분석 실패: ${errorMessage}`);
        }
        setResult(null);
        return;
      }

      setResult(data as ScanResult);
    } catch (err: any) {
      setError('네트워크 오류 또는 요청 실패: 서버에 접속할 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-5xl flex-col items-center py-16 px-4 bg-white dark:bg-black">
        <IntroSection />
        <UrlInputForm onSubmit={handleScan} disabled={loading} />

        <div className="mt-8 w-full max-w-3xl">
          {loading && (
            <p className="text-center text-lg font-medium text-yellow-500 dark:text-yellow-400">
              URL을 분석하는 중입니다...
            </p>
          )}
          {error && (
            <p className="text-center text-lg font-medium text-red-600 dark:text-red-400">
              🚨 오류: {error}
            </p>
          )}

          {result && <ResultCard result={result} />}
        </div>
      </main>
    </div>
  );
}
