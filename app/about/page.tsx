export default function AboutPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Score-URL 프로젝트 소개
      </h1>

      <p className="text-slate-700 leading-relaxed">
        Score-URL은 사용자가 입력한 URL을 기반으로 외부 보안 API와 자체 분석
        알고리즘을 사용하여 위험도 점수 및 신뢰도를 제공하는 웹 서비스입니다.
        Google Safe Browsing, VirusTotal 등 다양한 보안 플랫폼과 연동하여
        악성/피싱 사이트 여부를 자동 판단합니다.
      </p>

      <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">서비스 기능</h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-200">
          <li>URL 위험도 점수 분석 및 신뢰도 등급(A~F) 제공</li>
          <li>Google Safe Browsing & VirusTotal 기반 악성/피싱 탐지</li>
          <li>사용자별 URL 분석 기록 저장 및 조회 기능</li>
          <li>Clerk 인증 기반 사용자 보호 및 API 접근 제어</li>
        </ul>
      </div>

      <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">
          프로젝트 팀 구성
        </h2>
        <p className="text-slate-200">
          중부대학교 웹 서버 보안 프로그래밍 팀 프로젝트
        </p>
        <p className="text-slate-200 text-sm">프론트엔드: 곽남호</p>
        <p className="text-slate-200 text-sm">백엔드/API: 김민석, 박성준</p>
        <p className="text-slate-200 text-sm">DB: 오소망</p>
      </div>
    </div>
  )
}
