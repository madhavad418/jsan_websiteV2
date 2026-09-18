/** A company post read from LinkedIn by api/linkedin.php, for the header ticker. */
export type LinkedInPost = {
  title: string
  /** ISO date, YYYY-MM-DD. */
  date: string
  href: string
}

export type NewsUpdate = {
  id?: number
  title: string
  date: string
  href: string
  published: boolean
}
