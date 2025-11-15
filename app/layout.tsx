// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Score-URL',
  description: 'URL 보안 점수 분석 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="flex min-h-screen flex-col">
          {/* --- 헤더 --- */}
          <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
            <div className="container mx-auto flex h-14 items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-emerald-500 px-2 py-0.5 text-xs font-semibold text-slate-900">
                  SCORE
                </span>
                <Link
                  href="/"
                  className="text-sm font-semibold hover:text-white"
                >
                  Score-URL
                </Link>
              </div>

              <nav className="flex gap-4 text-xs text-slate-300">
                <Link href="/" className="cursor-pointer hover:text-white">
                  홈
                </Link>
                <Link
                  href="/history"
                  className="cursor-pointer hover:text-white"
                >
                  기록(예정)
                </Link>
                <Link href="/about" className="cursor-pointer hover:text-white">
                  소개
                </Link>
              </nav>
            </div>
          </header>

          {/* --- 메인 콘텐트트 --- */}
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">{children}</div>
          </main>

          {/* --- 푸터 --- */}
          <footer className="border-t border-slate-800 bg-slate-900/80">
            <div className="container mx-auto flex h-10 items-center justify-between px-4 text-xs text-slate-400">
              <span>© 2025 Score-URL Project</span>
              <span>중부대 웹 서버 보안 프로그래밍</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
