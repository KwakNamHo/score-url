export default function HistoryPage() {
  const dummyHistory = [
    { id: 1, url: 'https://naver.com', score: 92, date: '2025-11-12' },
    { id: 2, url: 'http://test.phish.com', score: 20, date: '2025-11-11' },
    { id: 3, url: 'https://example.com', score: 75, date: '2025-11-10' },
  ]

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">분석 기록</h1>
      <p className="text-slate-900 text-sm">
        지금까지 분석했던 URL 목록입니다. (추후 백엔드 DB 연동 예정)
      </p>

      <div className="space-y-3">
        {dummyHistory.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900/60 border border-slate-700 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-slate-100">{item.url}</p>
              <p className="text-xs text-slate-300">{item.date}</p>
            </div>

            <span
              className={`text-sm font-bold px-3 py-1 rounded ${
                item.score >= 80
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : item.score >= 50
                  ? 'bg-yellow-500/20 text-yellow-300'
                  : 'bg-red-500/20 text-red-300'
              }`}
            >
              {item.score} 점
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
