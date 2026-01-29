"use client"
import { useRouter } from 'next/navigation'

export default function RefreshButton() {
  const router = useRouter()
  return (
    <button
      onClick={() => router.refresh()}
      className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-emerald-500 hover:text-white transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      title="Refresh dashboard"
      type="button"
    >
      Refresh
    </button>
  )
}
