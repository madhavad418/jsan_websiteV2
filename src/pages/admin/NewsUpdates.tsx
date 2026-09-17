import { useEffect, useState } from 'react'
import type { NewsUpdate } from '../../data/newsUpdates'
import { deleteNewsUpdate, fetchNewsUpdates, saveNewsUpdate } from '../../lib/api'

const field = 'mt-1 w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0050a9]'
const button = 'rounded px-4 py-2 text-sm font-semibold disabled:opacity-50'

export default function NewsUpdates() {
  const [items, setItems] = useState<NewsUpdate[]>([])
  const [draft, setDraft] = useState<NewsUpdate | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const reload = async () => {
    setLoading(true)
    try { setItems(await fetchNewsUpdates(true)) }
    catch (e) { setError(e instanceof Error ? e.message : 'Could not load news updates') }
    finally { setLoading(false) }
  }
  useEffect(() => { void reload() }, [])

  const save = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!draft) return
    setBusy(true); setError(''); setMessage('')
    try {
      await saveNewsUpdate(draft)
      setDraft(null)
      setMessage('Update saved. Published updates appear in the ticker within one minute.')
      await reload()
    } catch (e) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setBusy(false) }
  }

  const remove = async (item: NewsUpdate) => {
    if (!item.id || !window.confirm(`Delete “${item.title}”?`)) return
    setBusy(true); setError(''); setMessage('')
    try { await deleteNewsUpdate(item.id); setMessage('Update deleted.'); await reload() }
    catch (e) { setError(e instanceof Error ? e.message : 'Delete failed') }
    finally { setBusy(false) }
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div><h2 className="text-xl font-bold text-gray-900">News updates</h2><p className="mt-1 text-sm text-gray-600">The header shows up to six published announcements, newest first.</p></div>
        {!draft && <button disabled={loading || busy || !!error} className={`${button} bg-[#0050a9] text-white`} onClick={() => { setMessage(''); setDraft({ title: '', date: new Date().toISOString().slice(0, 10), href: '/insights', published: false }) }}>+ New update</button>}
      </div>
      {error && <div role="alert" className="mb-4 rounded bg-red-50 p-3 text-sm text-red-700">{error} <button className="underline" onClick={() => { setError(''); void reload() }}>Retry loading</button></div>}
      {message && <p role="status" className="mb-4 text-sm text-green-700">{message}</p>}
      {draft ? (
        <form onSubmit={save} className="space-y-4">
          <h3 className="font-semibold text-gray-900">{draft.id ? 'Edit update' : 'New update'}</h3>
          <label className="block text-sm font-medium">Headline<input required maxLength={180} className={field} value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} /></label>
          <label className="block text-sm font-medium">Publication date<input required type="date" className={field} value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} /></label>
          <label className="block text-sm font-medium">Link to a page on this website<input required maxLength={500} className={field} placeholder="/news/jsan-atlas-ops" value={draft.href} onChange={(e) => setDraft({ ...draft, href: e.target.value })} /></label>
          <p className="text-xs text-gray-500">Use an existing page, such as /insights, /work or a published article. This creates a ticker announcement, not a new article page.</p>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={draft.published} onChange={(e) => setDraft({ ...draft, published: e.target.checked })} />Published — show in the news ticker</label>
          <p className="text-xs text-gray-500">Unchecked updates remain drafts. Future-dated published updates appear on their publication date (UTC).</p>
          <div className="flex gap-3"><button disabled={busy || !draft.title.trim()} className={`${button} bg-[#0050a9] text-white`}>{busy ? 'Saving…' : 'Save update'}</button><button type="button" disabled={busy} className={`${button} bg-gray-100 text-gray-700`} onClick={() => setDraft(null)}>Cancel</button></div>
        </form>
      ) : loading ? <p className="text-gray-500">Loading updates…</p> : (
        <div className="divide-y">
          {items.map((item) => <div key={item.id} className="flex flex-wrap items-center gap-3 py-4"><div className="min-w-0 flex-1"><p className="font-semibold text-gray-900">{item.title}</p><p className="mt-1 text-sm text-gray-500">{item.date} · {item.published ? (item.date > new Date().toISOString().slice(0, 10) ? 'Scheduled' : 'Published') : 'Draft'} · {item.href}</p></div><button disabled={busy} className="text-sm text-[#0050a9]" onClick={() => { setError(''); setMessage(''); setDraft({ ...item }) }}>Edit</button><button disabled={busy} className="text-sm text-red-600" onClick={() => void remove(item)}>Delete</button></div>)}
          {!items.length && !error && <p className="py-6 text-gray-500">No announcements yet. Add your first update above.</p>}
        </div>
      )}
    </section>
  )
}
