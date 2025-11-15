export default function HistoryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">분석 기록</h1>

      <p className="text-slate-600 text-sm">
        지금까지 분석한 URL 기록을 확인할 수 있는 페이지입니다. (백엔드/DB 연동
        예정)
      </p>

      <div className="rounded-xl border border-slate-300 bg-white p-6 text-slate-600">
        기록 데이터가 없습니다.
      </div>
    </div>
  )
}
