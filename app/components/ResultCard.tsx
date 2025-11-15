import { ScanResult } from '@/lib/types'

export default function ResultCard({ result }: { result: ScanResult }) {
  const statusLabel = {
    safe: '안전',
    warning: '주의',
    danger: '위험',
  }[result.status]

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/80 p-6 max-w-3xl mx-auto mt-6">
      {/* URL */}
      <div className="text-sm text-slate-300">
        분석 대상: <span className="text-white">{result.url}</span>
      </div>

      {/* 점수 */}
      <div className="mt-3 text-3xl font-bold text-white">
        {result.score}
        <span className="text-sm text-slate-400"> / 100</span>
      </div>

      {/* 메시지 */}
      <p className="mt-4 text-xs text-slate-300">{result.detail}</p>
    </section>
  )
}
