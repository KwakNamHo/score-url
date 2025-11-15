'use client'

import { useState, FormEvent } from 'react'
import { isValidUrl } from '@/lib/validateUrl'

export default function UrlInputForm({
  onSubmit,
}: {
  onSubmit: (url: string) => void
}) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setError('')

    if (!url.trim()) {
      setError('URL을 입력해주세요.')
      return
    }

    if (!isValidUrl(url)) {
      setError('올바른 URL 형식이 아닙니다.')
      return
    }

    onSubmit(url)
  }

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 max-w-3xl mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-xs font-medium text-slate-300">
          검사할 URL
        </label>

        <input
          type="text"
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-50"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          className="rounded-lg bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-900"
        >
          분석하기
        </button>
      </form>
    </section>
  )
}
