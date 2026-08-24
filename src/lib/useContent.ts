// Public content hooks. Render instantly from the bundled data (fallback),
// then swap to live API data when it arrives  so the site never shows blank
// and never breaks if the API is unavailable.
import { useEffect, useState } from 'react'
import bundledBlogs, { type Blog } from '../data/blogs'
import { jobs as bundledJobs, type Job } from '../data/jobs'
import { fetchBlogs, fetchJobs } from './api'

export function useBlogs(): Blog[] {
  const [data, setData] = useState<Blog[]>(bundledBlogs)
  useEffect(() => {
    let alive = true
    fetchBlogs(true)
      .then((d) => { if (alive && Array.isArray(d) && d.length) setData(d) })
      .catch(() => {})
    return () => { alive = false }
  }, [])
  return data
}

export function useJobs(): Job[] {
  const [data, setData] = useState<Job[]>(bundledJobs)
  useEffect(() => {
    let alive = true
    fetchJobs()
      .then((d) => { if (alive && Array.isArray(d) && d.length) setData(d) })
      .catch(() => {})
    return () => { alive = false }
  }, [])
  return data
}
