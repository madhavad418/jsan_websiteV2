/**
 * The people on /company/leadership. They appear in this order.
 *
 * Photographs are referenced but not yet supplied. Each `photo` points at
 * public/team/<slug>.jpg; until a file is there the page falls back to the person's
 * initials rather than a broken image, so the roster is publishable either way.
 *
 * When adding the photographs: square, at least 400x400, cropped to the face. The page
 * masks them to a circle, so anything that matters has to sit inside the middle of the
 * frame or it will be cut off.
 */
export type Leader = {
  name: string
  /** Job title as it should read publicly, e.g. 'Founder & CEO'. */
  role: string
  /** '/team/<file>' - omit and the page shows the person's initials instead. */
  photo?: string
  /** Optional one-line focus, shown under the role. Keep it to a single sentence. */
  focus?: string
  linkedin?: string
}

export const leadership: Leader[] = [
  {
    name: 'Ram Reddy',
    role: 'CEO',
    photo: '/pillars/Ram.webp',
    focus: 'Strategic vision · Enterprise leadership',
  },
  {
    name: 'Navin Surapaneni',
    role: 'Director of Operations – India',
    photo: '/pillars/naveen.webp',
    focus: 'Operations excellence · Capacity building',
  },
  {
    name: 'Chandrika B R',
    role: 'Senior Vice President – Strategy & Business Growth',
    photo: '/pillars/chandrika.webp',
    focus: 'Growth leadership · Business transformation',
  },
  {
    name: 'Satish Voleti',
    role: 'Practice Head – Geospatial & Field Operations',
    photo: '/pillars/sathish.webp',
    focus: 'Capability building · Quality ownership',
  },
  {
    name: 'Santosh Kumar Panda',
    role: 'Delivery Head – GIS Data Services',
    photo: '/pillars/santhosh.webp',
    focus: 'Process · Performance',
  },
  {
    name: 'Kalpesh Mehta',
    role: 'Global Head – Recruitment',
    photo: '/pillars/kalpesh.webp',
    focus: 'Staffing solutions',
  },
  {
    name: 'Mahesh Kumar T',
    role: 'AVP – Client Engagement',
    photo: '/pillars/mahesh.png',
    focus: 'Alignment · Accountability',
  },
]

/**
 * Initials for a person with no photograph yet: first name and last name.
 *
 * Not the first two words - several of these names carry a middle initial, and
 * "Santosh Kumar Panda" reading as SK rather than SP is the kind of small wrongness
 * people notice about their own name.
 */
export function initialsOf(name: string) {
  const parts = name.split(/\s+/).filter(Boolean)
  if (parts.length === 0) return ''
  const first = parts[0][0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] ?? '' : ''
  return (first + last).toUpperCase()
}
