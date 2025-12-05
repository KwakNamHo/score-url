// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { ClerkProvider } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import type { ReactNode } from 'react';
import UserButtonClient from './components/UserButtonClient';

export const metadata: Metadata = {
  title: 'SCORE-URL',
  description: 'URL 보안 점수 분석 서비스',
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 서버 컴포넌트에서 Clerk 로그인 상태 확인
  const { userId } = await auth();

  return (
    <ClerkProvider>
      <html lang="ko">
        <body className="min-h-screen bg-slate-950 text-slate-100">
          <div className="flex min-h-screen flex-col">
            {/* 상단 헤더 */}
            <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
              <div className="container mx-auto flex h-14 items-center justify-between px-4">
                {/* 로고 */}
                <Link href="/" className="text-xl font-bold text-white">
                  Score-URL
                </Link>

                <div className="flex items-center gap-4">
                  {/* 메뉴 */}
                  <nav className="flex gap-4 text-xs text-slate-300">
                    <Link
                      href="/"
                      className="cursor-pointer hover:text-white"
                    >
                      홈
                    </Link>
                    <Link
                      href="/history"
                      className="cursor-pointer hover:text-white"
                    >
                      기록
                    </Link>
                    <Link
                      href="/about"
                      className="cursor-pointer hover:text-white"
                    >
                      소개
                    </Link>
                  </nav>

                  {/* 로그인 / 로그아웃 영역 */}
                  {userId ? (
                    // 🔐 로그인 O → Clerk UserButton (프로필 + 로그아웃 메뉴)
                    <UserButtonClient />
                  ) : (
                    // 🔓 로그인 X → 로그인 버튼
                    <Link
                      href="/sign-in"
                      className="rounded bg-indigo-600 px-3 py-1 text-xs text-white hover:bg-indigo-700"
                    >
                      로그인
                    </Link>
                  )}
                </div>
              </div>
            </header>

            {/* 메인 영역 */}
            <main className="flex-1">
              <div className="container mx-auto px-4 py-8">{children}</div>
            </main>

            {/* 푸터 */}
            <footer className="border-t border-slate-800 bg-slate-900/80">
              <div className="container mx-auto flex h-10 items-center justify-between px-4 text-xs text-slate-400">
                <span>© 2025 Score-URL Project</span>
                <span>중부대학교 웹 서버 보안 프로그래밍</span>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
