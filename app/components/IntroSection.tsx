// app/components/IntroSection.tsx

export default function IntroSection() {
  return (
    <section className="space-y-2 pt-12 text-center sm:text-left">
      <h1 className="text-3xl font-bold text-white dark:text-zinc-50">
        URL 보안 점수 분석
      </h1>

      <p className="text-sm text-slate-400 leading-relaxed max-w-lg mx-auto sm:mx-0">
        검사하고 싶은 URL을 입력하면 외부 보안 API를 활용해 위험도를 분석하고
        점수로 보여주는 서비스입니다.
      </p>
    </section>
  )
}
