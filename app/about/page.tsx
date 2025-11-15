export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-slate-900">
        Score-URL 프로젝트 소개
      </h1>

      <p className="text-slate-700 leading-relaxed">
        Score-URL은 사용자가 입력한 URL을 기반으로 외부 보안 API와 자체 분석
        알고리즘을 활용하여 <strong>위험도 점수</strong>를 제공하는
        서비스입니다.
      </p>

      <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">서비스 기능</h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-200">
          <li>URL 위험도 점수 분석</li>
          <li>피싱 / 악성 사이트 탐지</li>
          <li>최근 분석 기록 제공</li>
          <li>위험 URL 분류 / 카테고리 분류</li>
        </ul>
      </div>

      <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">프로젝트 정보</h2>
        <p className="text-slate-200">
          중부대학교 웹 서버 보안 프로그래밍 팀 프로젝트
        </p>
        <p className="text-slate-200 text-sm">프론트엔드: 곽남호</p>
        <p className="text-slate-200 text-sm">백엔드: 김민석,박성준</p>
        <p className="text-slate-200 text-sm">DB: 오소망</p>
      </div>
    </div>
  )
}
