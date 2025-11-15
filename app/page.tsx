'use client'

import { useState } from 'react'
import IntroSection from './components/IntroSection'
import UrlInputForm from './components/UrlInputForm'
import ResultCard from './components/ResultCard'
import { ScanResult } from '@/lib/types'

export default function HomePage() {
  const [result, setResult] = useState<ScanResult | null>(null)

  const handleScan = async (url: string) => {
    setResult({
      url,
      score: 82,
      status: 'warning',
      detail: '테스트 데이터입니다. API 연동 예정.',
    })
  }

  return (
    <div className="max-w-5xl mx-auto px-4 space-y-10 py-10">
      <IntroSection />
      <UrlInputForm onSubmit={handleScan} />
      {result && <ResultCard result={result} />}
    </div>
  )
}
