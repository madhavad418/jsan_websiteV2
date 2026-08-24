// Client for the JSAN PHP API (same-origin /api in prod; vite-proxied in dev).
import type { Blog } from '../data/blogs'
import type { Job } from '../data/jobs'

/*
 * Same-origin /api by default, which is how the cPanel deployment serves the PHP
 * endpoints. Hosts without a PHP runtime (Railway, Vercel) set VITE_API_BASE to
 * the absolute URL of wherever the API actually lives; when it is unreachable the
 * content hooks fall back to the bundled data, so the public site still renders.
 */
const RAW_BASE = import.meta.env.VITE_API_BASE || '/api'
const BASE = RAW_BASE.endsWith('/') ? RAW_BASE.slice(0, -1) : RAW_BASE
const TOKEN_KEY = 'jsan_admin_token'

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY)
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)
export const isLoggedIn = (): boolean => !!getToken()

async function authed(url: string, init: RequestInit = {}): Promise<Response> {
  const token = getToken()
  const res = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
      ...(token ? { 'X-Auth-Token': token } : {}),
    },
  })
  if (res.status === 401) {
    clearToken()
    throw new Error('Unauthorized')
  }
  return res
}

export async function login(username: string, password: string): Promise<boolean> {
  const res = await fetch(`${BASE}/auth.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) return false
  const data = await res.json()
  if (!data.token) return false
  setToken(data.token)
  return true
}

/* ---------- public reads ---------- */
export async function fetchBlogs(includeHidden = false): Promise<Blog[]> {
  const res = await fetch(`${BASE}/blogs.php${includeHidden ? '?all=1' : ''}`)
  if (!res.ok) throw new Error('Failed to load blogs')
  return res.json()
}
export async function fetchJobs(): Promise<Job[]> {
  const res = await fetch(`${BASE}/jobs.php`)
  if (!res.ok) throw new Error('Failed to load jobs')
  return res.json()
}

export async function uploadImage(file: File): Promise<{ ok: boolean; url: string }> {
  const token = getToken()
  const fd = new FormData()
  fd.append('file', file)
  // No Content-Type header  the browser sets the multipart boundary.
  const res = await fetch(`${BASE}/upload.php`, {
    method: 'POST',
    headers: token ? { 'X-Auth-Token': token } : {},
    body: fd,
  })
  if (res.status === 401) { clearToken(); throw new Error('Unauthorized') }
  const data = await res.json()
  if (!res.ok || !data.url) throw new Error(data.error || 'Upload failed')
  return data
}

/* ---------- admin writes ---------- */
export async function saveBlog(blog: Blog): Promise<{ ok: boolean; slug: string }> {
  return (await authed(`${BASE}/blogs.php`, { method: 'POST', body: JSON.stringify(blog) })).json()
}
export async function deleteBlog(slug: string): Promise<{ ok: boolean }> {
  return (await authed(`${BASE}/blogs.php?delete=1&slug=${encodeURIComponent(slug)}`, { method: 'POST' })).json()
}
export async function saveJob(job: Job & { sortOrder?: number }): Promise<{ ok: boolean; id: string }> {
  return (await authed(`${BASE}/jobs.php`, { method: 'POST', body: JSON.stringify(job) })).json()
}
export async function deleteJob(id: string): Promise<{ ok: boolean }> {
  return (await authed(`${BASE}/jobs.php?delete=1&id=${encodeURIComponent(id)}`, { method: 'POST' })).json()
}
