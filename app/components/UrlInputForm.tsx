// app/components/UrlInputForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { isValidUrl } from '@/lib/validateUrl';

type UrlInputFormProps = {
  // onSubmit 함수가 Promise<void>를 반환하도록 타입 정의
  onSubmit: (url: string) => Promise<void>;
  // 부모에서 내려주는 "분석 중" 상태
  disabled: boolean;
};

export default function UrlInputForm({ onSubmit, disabled }: UrlInputFormProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  // 🔐 Clerk 로그인 상태
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // 분석 중이면 제출 막기
    if (disabled) return;

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError('URL을 입력해주세요.');
      return;
    }

    if (!isValidUrl(trimmedUrl)) {
      setError('올바른 URL 형식이 아닙니다.');
      return;
    }

    // 로그인 상태 확인 중일 때
    if (!isLoaded) {
      setError('로그인 상태를 확인 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    // ❌ 비로그인 상태면 안내 + 로그인 페이지로 이동
    if (!isSignedIn) {
      alert(
        'URL 보안 점수 분석은 로그인 후 이용 가능합니다.\n로그인 페이지로 이동합니다.'
      );
      router.push('/sign-in');
      return;
    }

    // ✅ 로그인 된 경우에만 실제 분석 실행
    try {
      await onSubmit(trimmedUrl);
      // 필요하면 성공 후 입력창 비우기
      // setUrl('');
    } catch (err) {
      console.error(err);
      setError('분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  };

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 max-w-3xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-xs font-medium text-slate-300">
          검사할 URL
        </label>

        <input
          type="text"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError(''); // 입력 중 에러 메시지 지우기 (선택)
          }}
          disabled={disabled}
        />

        {error && (
          <p className="text-xs text-red-400 whitespace-pre-line">{error}</p>
        )}

        {/* 로그인 안내 문구 */}
        {!disabled && isLoaded && !isSignedIn && (
          <p className="text-[11px] text-amber-400">
            * 현재 비로그인 상태입니다. 로그인 후 이용해주세요.
          </p>
        )}

        <button
          type="submit"
          className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
            disabled
              ? 'bg-slate-500 text-slate-300 cursor-not-allowed'
              : 'bg-emerald-500 text-slate-900 hover:bg-emerald-600'
          }`}
          disabled={disabled}
        >
          {disabled ? '분석 중...' : '분석하기'}
        </button>
      </form>
    </section>
  );
}
