/**
 * The photograph layer behind a hero, plus the scrim that keeps copy readable on it.
 *
 * Drop it as the first child of a `relative` hero section and put the copy after it in a
 * `relative z-10` wrapper. The section supplies its own dark background colour, which shows
 * through wherever the photograph does not reach.
 *
 * Four things this exists to get right, all of which were wrong when each hero carried its
 * own copy of them:
 *
 *  - top-[77px] is the fixed header's height. Hero sections slide under the header, so
 *    without this inset the top of every photograph is hidden behind an opaque white bar
 *    and captions baked into the artwork get cut off.
 *  - The scrim is directional rather than flat. It goes opaque under the copy and clears
 *    on the other half, so the side of the picture carrying the subject stays visible.
 *    `copySide` says which half the copy is on, and it should be read off the photograph.
 *  - Below lg there is no room to split, so the scrim runs top to bottom instead and the
 *    copy sits over the whole frame.
 *  - The crop flips axis between breakpoints, so the focal point has to as well. See below.
 *
 * FOCAL POINTS
 *
 * A wide hero is wider than these photographs are, so `cover` scales them to the frame's
 * width and trims top and bottom. `position` says what to keep vertically.
 *
 * A phone is the opposite case, and by a long way: at 320x600 the frame is about 0.5:1
 * while the artwork runs from 1.5:1 to 2.5:1, so `cover` scales to the frame's HEIGHT and
 * trims the sides hard - on the widest banners it shows barely a sixth of the width. A
 * centred crop there lands on whatever happens to sit in the middle, which on these images
 * is usually the gap between the subject and the copy space.
 *
 * So on mobile the crop is pulled towards the half the desktop scrim leaves clear, because
 * that is the half carrying the subject: copy on the left means the subject is on the
 * right, and vice versa. Pass `mobilePosition` to override when an image does not follow
 * that rule.
 */

type Props = {
  image: string
  imageAlt: string
  copySide?: 'left' | 'right'
  /** Desktop background-position. Controls what survives the vertical trim. */
  position?: string
  /** Mobile background-position. Defaults to the subject half implied by copySide. */
  mobilePosition?: string
}

const MOBILE_SCRIM =
  'linear-gradient(to bottom, rgba(3,20,45,0.90) 0%, rgba(3,20,45,0.78) 45%, rgba(3,20,45,0.90) 100%)'

const desktopScrim = (copySide: 'left' | 'right') =>
  `linear-gradient(to ${copySide === 'left' ? 'right' : 'left'}, rgba(3,20,45,0.94) 0%, rgba(3,20,45,0.88) 32%, rgba(3,20,45,0.55) 50%, rgba(3,20,45,0.14) 68%, rgba(3,20,45,0) 84%)`

/** Tailwind classes for the copy column that pairs with this backdrop. */
export const heroCopyColumn = (copySide: 'left' | 'right' = 'left') =>
  `lg:w-[52%] ${copySide === 'right' ? 'lg:ml-auto lg:pl-8' : 'lg:pr-8'}`

export default function HeroBackdrop({
  image,
  imageAlt,
  copySide = 'left',
  position = '50% 50%',
  mobilePosition,
}: Props) {
  const mobile = mobilePosition ?? (copySide === 'left' ? '72% 50%' : '28% 50%')

  return (
    <>
      {/* Two layers rather than one, because the focal point differs by breakpoint */}
      <div
        className="absolute inset-x-0 bottom-0 top-[77px] bg-cover lg:hidden"
        style={{ backgroundImage: `url(${image})`, backgroundPosition: mobile }}
        role="img"
        aria-label={imageAlt}
      />
      <div
        className="absolute inset-x-0 bottom-0 top-[77px] hidden bg-cover lg:block"
        style={{ backgroundImage: `url(${image})`, backgroundPosition: position }}
        role="img"
        aria-label={imageAlt}
      />

      <div
        className="absolute inset-x-0 bottom-0 top-[77px] lg:hidden"
        style={{ background: MOBILE_SCRIM }}
      />
      <div
        className="absolute inset-x-0 bottom-0 top-[77px] hidden lg:block"
        style={{ background: desktopScrim(copySide) }}
      />
    </>
  )
}
