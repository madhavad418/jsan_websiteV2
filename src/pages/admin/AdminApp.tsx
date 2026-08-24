import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import type { Blog, BlogBlock } from '../../data/blogs'
import type { Job } from '../../data/jobs'
import {
  isLoggedIn, login, clearToken,
  fetchBlogs, fetchJobs, saveBlog, deleteBlog, saveJob, deleteJob, uploadImage,
} from '../../lib/api'

/* ----------------------------- content helpers ---------------------------- */

let _uid = 0
const uid = () => `b${++_uid}`

type Draft = { _k: string; block: BlogBlock }

// A block's plain-text representation, used when converting between block types.
function blockText(b: BlogBlock): string {
  if (b.type === 'point') return `${b.lead}: ${b.text}`.replace(/^:\s*/, '').trim()
  if (b.type === 'image') return ''
  return b.text
}

function convertBlock(b: BlogBlock, type: BlogBlock['type']): BlogBlock {
  if (b.type === type) return b
  if (type === 'heading') return { type: 'heading', text: blockText(b) }
  if (type === 'paragraph') return { type: 'paragraph', text: blockText(b) }
  if (type === 'point') return { type: 'point', lead: '', text: blockText(b) }
  return { type: 'image', url: b.type === 'image' ? b.url : '' }
}

// Load a blog's stored content into editor drafts. Existing blogs keep their
// blocks verbatim; a legacy plain-string blog becomes one paragraph per chunk.
function contentToDrafts(content: Blog['content']): Draft[] {
  if (typeof content === 'string') {
    return content.split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean)
      .map((t) => ({ _k: uid(), block: { type: 'paragraph', text: t } as BlogBlock }))
  }
  if (Array.isArray(content)) return content.map((b) => ({ _k: uid(), block: b }))
  return []
}

// Drafts back to storable blocks, dropping empty ones.
function draftsToContent(drafts: Draft[]): BlogBlock[] {
  return drafts.map((d) => d.block).filter((b) => {
    if (b.type === 'image') return b.url.trim() !== ''
    if (b.type === 'point') return b.lead.trim() !== '' || b.text.trim() !== ''
    return b.text.trim() !== ''
  })
}

const linesToArr = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean)
const arrToLines = (a?: string[]) => (a || []).join('\n')
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

/* --------------------------------- styles --------------------------------- */
const input = 'w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0050a9]'
const label = 'block text-sm font-medium text-gray-700 mb-1'
const btn = 'px-4 py-2 rounded font-semibold transition-colors'
const chip = 'px-3 py-1.5 rounded text-sm font-medium border border-gray-300 bg-white text-gray-700 hover:border-[#0050a9] hover:text-[#0050a9] transition-colors'

/* --------------------------------- login ---------------------------------- */
function LoginView({ onLogin }: { onLogin: () => void }) {
  const [u, setU] = useState('')
  const [p, setP] = useState('')
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true); setErr('')
    try {
      const ok = await login(u, p)
      if (ok) onLogin()
      else setErr('Invalid username or password')
    } catch {
      setErr('Could not reach the server')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={submit} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[#0050a9] mb-1">JSAN Admin</h1>
        <p className="text-gray-500 text-sm mb-6">Sign in to manage blogs &amp; careers</p>
        {err && <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{err}</div>}
        <div className="mb-4">
          <label className={label}>Username</label>
          <input className={input} value={u} onChange={(e) => setU(e.target.value)} autoFocus />
        </div>
        <div className="mb-6">
          <label className={label}>Password</label>
          <input className={input} type="password" value={p} onChange={(e) => setP(e.target.value)} />
        </div>
        <button disabled={busy} className={`${btn} w-full bg-[#0050a9] text-white hover:bg-[#003d80] disabled:opacity-60`}>
          {busy ? 'Signing in…' : 'Sign In'}
        </button>
        <Link to="/" className="block text-center text-sm text-gray-400 hover:text-gray-600 mt-4">← Back to site</Link>
      </form>
    </div>
  )
}

/* ----------------------------- image uploading ---------------------------- */
function useImageUpload() {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const upload = async (file: File | undefined, onDone: (url: string) => void) => {
    if (!file) return
    if (!file.type.startsWith('image/')) { setErr('Please choose an image file'); return }
    setBusy(true); setErr('')
    try {
      const r = await uploadImage(file)
      onDone(r.url)
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setBusy(false)
    }
  }
  return { busy, err, upload }
}

// Drag-and-drop (or click) image upload zone. Shows a preview once set.
function ImageDropZone({ value, onChange, padding = 'p-6' }: { value: string; onChange: (url: string) => void; padding?: string }) {
  const { busy, err, upload } = useImageUpload()
  const [over, setOver] = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true) }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); upload(e.dataTransfer.files?.[0], onChange) }}
        onClick={() => ref.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${padding} ${over ? 'border-[#0050a9] bg-[#eef5ff]' : 'border-gray-300 hover:border-[#0050a9]/60 hover:bg-gray-50'}`}
      >
        <input
          ref={ref}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
          className="hidden"
          onChange={(e) => { upload(e.target.files?.[0], onChange); e.currentTarget.value = '' }}
        />
        {value ? (
          <img src={value} alt="Selected image preview" className="max-h-44 w-auto rounded object-contain" />
        ) : (
          <span className="text-sm text-gray-500 text-center">
            {busy ? 'Uploading…' : 'Drag & drop an image here, or click to upload'}
          </span>
        )}
        {busy && value && (
          <span className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm text-gray-600 rounded-lg">Uploading…</span>
        )}
      </div>
      {err && <p className="text-xs text-red-600 mt-1">{err}</p>}
    </div>
  )
}

// Card / background image field: URL box + drag-drop zone.
function ImageUploadField({ label: lbl, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  return (
    <div>
      <label className={label}>{lbl}</label>
      <input className={input} value={value} placeholder="Paste a URL, or drag/drop below" onChange={(e) => onChange(e.target.value)} />
      <div className="mt-1.5">
        <ImageDropZone value={value} onChange={onChange} padding="p-3" />
      </div>
    </div>
  )
}

/* ---------------------------- blog block editor --------------------------- */
function BlockCard({
  draft, index, count, onChange, onType, onMove, onRemove,
}: {
  draft: Draft
  index: number
  count: number
  onChange: (b: BlogBlock) => void
  onType: (t: BlogBlock['type']) => void
  onMove: (dir: -1 | 1) => void
  onRemove: () => void
}) {
  const b = draft.block
  const iconBtn = 'w-7 h-7 flex items-center justify-center rounded border border-gray-300 bg-white text-gray-600 hover:border-[#0050a9] hover:text-[#0050a9] disabled:opacity-30 disabled:hover:border-gray-300 disabled:hover:text-gray-600'
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
      <div className="flex items-center gap-2 mb-2">
        <select
          value={b.type}
          onChange={(e) => onType(e.target.value as BlogBlock['type'])}
          className="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-gray-700"
        >
          <option value="paragraph">Paragraph</option>
          <option value="heading">Heading</option>
          <option value="point">Point</option>
          <option value="image">Image</option>
        </select>
        <div className="flex-1" />
        <button type="button" title="Move up" disabled={index === 0} onClick={() => onMove(-1)} className={iconBtn}>↑</button>
        <button type="button" title="Move down" disabled={index === count - 1} onClick={() => onMove(1)} className={iconBtn}>↓</button>
        <button type="button" title="Delete block" onClick={onRemove} className={`${iconBtn} hover:!border-red-400 hover:!text-red-600`}>✕</button>
      </div>

      {b.type === 'heading' && (
        <input className={input} value={b.text} placeholder="Heading text" onChange={(e) => onChange({ ...b, text: e.target.value })} />
      )}
      {b.type === 'paragraph' && (
        <textarea className={input} rows={3} value={b.text} placeholder="Paragraph text" onChange={(e) => onChange({ ...b, text: e.target.value })} />
      )}
      {b.type === 'point' && (
        <div className="grid gap-2">
          <input className={input} value={b.lead} placeholder="Lead (shown in bold)" onChange={(e) => onChange({ ...b, lead: e.target.value })} />
          <textarea className={input} rows={2} value={b.text} placeholder="Point text" onChange={(e) => onChange({ ...b, text: e.target.value })} />
        </div>
      )}
      {b.type === 'image' && (
        <div className="space-y-2">
          <ImageDropZone value={b.url} onChange={(url) => onChange({ ...b, url })} padding="p-5" />
          <input className={input} value={b.caption || ''} placeholder="Caption (optional)" onChange={(e) => onChange({ ...b, caption: e.target.value })} />
        </div>
      )}
    </div>
  )
}

function BlockEditor({ drafts, setDrafts }: { drafts: Draft[]; setDrafts: React.Dispatch<React.SetStateAction<Draft[]>> }) {
  const { busy, err, upload } = useImageUpload()
  const [over, setOver] = useState(false)

  const update = (i: number, block: BlogBlock) => setDrafts((ds) => ds.map((d, idx) => (idx === i ? { ...d, block } : d)))
  const changeType = (i: number, type: BlogBlock['type']) =>
    setDrafts((ds) => ds.map((d, idx) => (idx === i ? { ...d, block: convertBlock(d.block, type) } : d)))
  const move = (i: number, dir: -1 | 1) => setDrafts((ds) => {
    const j = i + dir
    if (j < 0 || j >= ds.length) return ds
    const n = [...ds]
    ;[n[i], n[j]] = [n[j], n[i]]
    return n
  })
  const remove = (i: number) => setDrafts((ds) => ds.filter((_, idx) => idx !== i))
  const add = (type: BlogBlock['type']) =>
    setDrafts((ds) => [...ds, { _k: uid(), block: convertBlock({ type: 'paragraph', text: '' }, type) }])
  const addImage = (url: string) => setDrafts((ds) => [...ds, { _k: uid(), block: { type: 'image', url } as BlogBlock }])

  return (
    <div className="space-y-3">
      {drafts.map((d, i) => (
        <BlockCard
          key={d._k}
          draft={d}
          index={i}
          count={drafts.length}
          onChange={(b) => update(i, b)}
          onType={(t) => changeType(i, t)}
          onMove={(dir) => move(i, dir)}
          onRemove={() => remove(i)}
        />
      ))}
      {drafts.length === 0 && <p className="text-sm text-gray-400 italic">No content yet  add a block below.</p>}

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs text-gray-400 mr-1">Add block:</span>
        <button type="button" onClick={() => add('paragraph')} className={chip}>+ Paragraph</button>
        <button type="button" onClick={() => add('heading')} className={chip}>+ Heading</button>
        <button type="button" onClick={() => add('point')} className={chip}>+ Point</button>
        <button type="button" onClick={() => add('image')} className={chip}>+ Image</button>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setOver(true) }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); upload(e.dataTransfer.files?.[0], addImage) }}
        className={`border-2 border-dashed rounded-lg p-4 text-center text-sm transition-colors ${over ? 'border-[#0050a9] bg-[#eef5ff] text-[#0050a9]' : 'border-gray-300 text-gray-500'}`}
      >
        {busy ? 'Uploading…' : '⬇ Drag an image here to add it to the article'}
      </div>
      {err && <p className="text-xs text-red-600">{err}</p>}
    </div>
  )
}

/* ------------------------------- blog editor ------------------------------ */
function BlogForm({ initial, onSaved, onCancel }: { initial: Blog | null; onSaved: () => void; onCancel: () => void }) {
  const [f, setF] = useState<Blog>(initial || {
    slug: '', title: '', excerpt: '', category: '', date: new Date().toISOString().slice(0, 10),
    readTime: '5 min read', image: '', backgroundImage: '/fttx-bg-gradient.jpg', author: 'JSAN Consulting',
    content: [], hidden: false,
  })
  const [drafts, setDrafts] = useState<Draft[]>(() => contentToDrafts(initial?.content ?? []))
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const set = (k: keyof Blog, v: unknown) => setF((p) => ({ ...p, [k]: v } as Blog))

  const save = async () => {
    setBusy(true); setErr('')
    try {
      const slug = f.slug || slugify(f.title)
      await saveBlog({ ...f, slug, content: draftsToContent(drafts) })
      onSaved()
    } catch {
      setErr('Save failed  are you still logged in?')
    } finally { setBusy(false) }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">{initial ? 'Edit Blog' : 'New Blog'}</h2>
      {err && <div className="text-sm text-red-600">{err}</div>}
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className={label}>Title</label><input className={input} value={f.title} onChange={(e) => set('title', e.target.value)} /></div>
        <div><label className={label}>Slug (URL)</label><input className={input} value={f.slug} placeholder={slugify(f.title)} onChange={(e) => set('slug', e.target.value)} disabled={!!initial} /></div>
        <div><label className={label}>Category</label><input className={input} value={f.category} onChange={(e) => set('category', e.target.value)} /></div>
        <div><label className={label}>Author</label><input className={input} value={f.author} onChange={(e) => set('author', e.target.value)} /></div>
        <div><label className={label}>Date</label><input className={input} type="date" value={f.date} onChange={(e) => set('date', e.target.value)} /></div>
        <div><label className={label}>Read time</label><input className={input} value={f.readTime} onChange={(e) => set('readTime', e.target.value)} /></div>
        <ImageUploadField label="Card image" value={f.image} onChange={(url) => set('image', url)} />
        <ImageUploadField label="Background image" value={f.backgroundImage || ''} onChange={(url) => set('backgroundImage', url)} />
      </div>
      <div><label className={label}>Excerpt</label><textarea className={input} rows={2} value={f.excerpt} onChange={(e) => set('excerpt', e.target.value)} /></div>
      <div>
        <label className={label}>Article content</label>
        <p className="text-xs text-gray-500 mb-2">Build the article from blocks. Add Paragraph, Heading, Point or Image blocks, reorder them with ↑/↓, and <strong>drag &amp; drop images</strong> straight into an Image block or the drop zone at the bottom.</p>
        <BlockEditor drafts={drafts} setDrafts={setDrafts} />
      </div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!f.hidden} onChange={(e) => set('hidden', e.target.checked)} /> Hidden (don’t list publicly)</label>
      <div className="flex gap-3">
        <button disabled={busy || !f.title} onClick={save} className={`${btn} bg-[#0050a9] text-white hover:bg-[#003d80] disabled:opacity-50`}>{busy ? 'Saving…' : 'Save'}</button>
        <button onClick={onCancel} className={`${btn} bg-gray-200 text-gray-700 hover:bg-gray-300`}>Cancel</button>
      </div>
    </div>
  )
}

/* -------------------------------- job editor ------------------------------ */
function JobForm({ initial, onSaved, onCancel }: { initial: Job | null; onSaved: () => void; onCancel: () => void }) {
  const [f, setF] = useState<Job>(initial || {
    id: '', title: '', level: 'Senior', location: '', department: '', type: 'Full-time',
    description: '', posted: '', fullDescription: '', requirements: [], qualifications: [], benefits: [],
  })
  const [reqs, setReqs] = useState(arrToLines(initial?.requirements))
  const [quals, setQuals] = useState(arrToLines(initial?.qualifications))
  const [bens, setBens] = useState(arrToLines(initial?.benefits))
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const set = (k: keyof Job, v: unknown) => setF((p) => ({ ...p, [k]: v } as Job))

  const save = async () => {
    setBusy(true); setErr('')
    try {
      const id = f.id || slugify(f.title)
      await saveJob({ ...f, id, requirements: linesToArr(reqs), qualifications: linesToArr(quals), benefits: linesToArr(bens) })
      onSaved()
    } catch {
      setErr('Save failed  are you still logged in?')
    } finally { setBusy(false) }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">{initial ? 'Edit Job' : 'New Job'}</h2>
      {err && <div className="text-sm text-red-600">{err}</div>}
      <div className="grid md:grid-cols-2 gap-4">
        <div><label className={label}>Title</label><input className={input} value={f.title} onChange={(e) => set('title', e.target.value)} /></div>
        <div><label className={label}>ID (URL)</label><input className={input} value={f.id} placeholder={slugify(f.title)} onChange={(e) => set('id', e.target.value)} disabled={!!initial} /></div>
        <div><label className={label}>Department</label><input className={input} value={f.department} onChange={(e) => set('department', e.target.value)} /></div>
        <div><label className={label}>Location</label><input className={input} value={f.location} onChange={(e) => set('location', e.target.value)} /></div>
        <div><label className={label}>Level</label><input className={input} value={f.level} onChange={(e) => set('level', e.target.value)} /></div>
        <div><label className={label}>Type</label><input className={input} value={f.type} onChange={(e) => set('type', e.target.value)} /></div>
      </div>
      <p className="text-xs text-gray-500 -mt-1">“Posted” is set automatically from when the job is created and updates over time (Just now → 2 days ago → …).</p>
      <div><label className={label}>Short description (listing card)</label><textarea className={input} rows={2} value={f.description} onChange={(e) => set('description', e.target.value)} /></div>
      <div><label className={label}>Full description (About This Role)</label><textarea className={input} rows={5} value={f.fullDescription} onChange={(e) => set('fullDescription', e.target.value)} /></div>
      <div className="grid md:grid-cols-3 gap-4">
        <div><label className={label}>Requirements (one per line)</label><textarea className={`${input} text-sm`} rows={8} value={reqs} onChange={(e) => setReqs(e.target.value)} /></div>
        <div><label className={label}>Qualifications (one per line)</label><textarea className={`${input} text-sm`} rows={8} value={quals} onChange={(e) => setQuals(e.target.value)} /></div>
        <div><label className={label}>What We Offer (one per line)</label><textarea className={`${input} text-sm`} rows={8} value={bens} onChange={(e) => setBens(e.target.value)} /></div>
      </div>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!f.filled} onChange={(e) => set('filled', e.target.checked)} /> Mark as filled  job stays visible but stops accepting applications</label>
      <div className="flex gap-3">
        <button disabled={busy || !f.title} onClick={save} className={`${btn} bg-[#0050a9] text-white hover:bg-[#003d80] disabled:opacity-50`}>{busy ? 'Saving…' : 'Save'}</button>
        <button onClick={onCancel} className={`${btn} bg-gray-200 text-gray-700 hover:bg-gray-300`}>Cancel</button>
      </div>
    </div>
  )
}

/* -------------------------------- dashboard ------------------------------- */
export default function AdminApp() {
  const [authed, setAuthed] = useState(isLoggedIn())
  const [tab, setTab] = useState<'jobs' | 'blogs'>('jobs')
  const [jobs, setJobs] = useState<Job[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [editingJob, setEditingJob] = useState<Job | null | undefined>(undefined) // undefined = closed
  const [editingBlog, setEditingBlog] = useState<Blog | null | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const reload = async () => {
    setLoading(true)
    try {
      const [j, b] = await Promise.all([fetchJobs(), fetchBlogs(true)])
      setJobs(j); setBlogs(b)
    } finally { setLoading(false) }
  }
  useEffect(() => { if (authed) reload() }, [authed])

  if (!authed) return <LoginView onLogin={() => setAuthed(true)} />

  const closeJob = () => setEditingJob(undefined)
  const closeBlog = () => setEditingBlog(undefined)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#0050a9] text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-bold text-lg">JSAN Admin</h1>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-white/80 hover:text-white">View site ↗</Link>
            <button onClick={() => { clearToken(); setAuthed(false) }} className="bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded">Sign out</button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {editingJob !== undefined ? (
          <div className="bg-white rounded-2xl shadow p-6"><JobForm initial={editingJob} onSaved={() => { closeJob(); reload() }} onCancel={closeJob} /></div>
        ) : editingBlog !== undefined ? (
          <div className="bg-white rounded-2xl shadow p-6"><BlogForm initial={editingBlog} onSaved={() => { closeBlog(); reload() }} onCancel={closeBlog} /></div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-6">
              <button onClick={() => setTab('jobs')} className={`${btn} ${tab === 'jobs' ? 'bg-[#0050a9] text-white' : 'bg-white text-gray-700'}`}>Jobs ({jobs.length})</button>
              <button onClick={() => setTab('blogs')} className={`${btn} ${tab === 'blogs' ? 'bg-[#0050a9] text-white' : 'bg-white text-gray-700'}`}>Blogs ({blogs.length})</button>
              <div className="flex-1" />
              {tab === 'jobs'
                ? <button onClick={() => setEditingJob(null)} className={`${btn} bg-green-600 text-white hover:bg-green-700`}>+ New Job</button>
                : <button onClick={() => setEditingBlog(null)} className={`${btn} bg-green-600 text-white hover:bg-green-700`}>+ New Blog</button>}
            </div>

            {loading && <p className="text-gray-500">Loading…</p>}

            {tab === 'jobs' && (
              <div className="bg-white rounded-2xl shadow divide-y">
                {jobs.map((j) => (
                  <div key={j.id} className="flex items-center gap-4 p-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{j.title} {j.filled && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded ml-1">FILLED</span>}</p>
                      <p className="text-sm text-gray-500">{j.department} · {j.location} · {j.type}</p>
                    </div>
                    <button onClick={async () => { await saveJob({ ...j, filled: !j.filled }); reload() }} className="text-amber-700 hover:underline text-sm">{j.filled ? 'Reopen' : 'Mark filled'}</button>
                    <button onClick={() => setEditingJob(j)} className="text-[#0050a9] hover:underline text-sm">Edit</button>
                    <button onClick={async () => { if (confirm(`Delete "${j.title}"?`)) { await deleteJob(j.id); reload() } }} className="text-red-600 hover:underline text-sm">Delete</button>
                  </div>
                ))}
                {!jobs.length && !loading && <p className="p-6 text-gray-500">No jobs yet.</p>}
              </div>
            )}

            {tab === 'blogs' && (
              <div className="bg-white rounded-2xl shadow divide-y">
                {blogs.map((b) => (
                  <div key={b.slug} className="flex items-center gap-4 p-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{b.title} {b.hidden && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded ml-1">hidden</span>}</p>
                      <p className="text-sm text-gray-500">{b.category} · {b.date}</p>
                    </div>
                    <button onClick={() => setEditingBlog(b)} className="text-[#0050a9] hover:underline text-sm">Edit</button>
                    <button onClick={async () => { if (confirm(`Delete "${b.title}"?`)) { await deleteBlog(b.slug); reload() } }} className="text-red-600 hover:underline text-sm">Delete</button>
                  </div>
                ))}
                {!blogs.length && !loading && <p className="p-6 text-gray-500">No blogs yet.</p>}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
