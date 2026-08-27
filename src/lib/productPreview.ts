/**
 * The one contract between whatever asks for the product preview and the dialog itself.
 *
 * A custom event rather than shared state or props: the ticker lives in the header, which
 * is rendered by every page, while the dialog is mounted once at the application root.
 * Threading a callback between them would mean lifting state through every page component
 * to connect two things that only ever exchange "show" and "hide".
 *
 * Two modes, because the two ways in want different behaviour:
 *
 *   'auto'  - the dialog opens itself on a first look at the homepage. It is the only
 *             thing on screen: focus moves into it, the page behind it cannot scroll,
 *             and it stays until it is dismissed.
 *   'hover' - a pointer is resting on the news item. It is a preview, not a task, so it
 *             must not steal focus or lock the page, and it goes when the pointer does.
 */

export const PRODUCT_PREVIEW_EVENT = 'jsan:product-preview'

export type PreviewMode = 'auto' | 'hover'

export type ProductPreviewDetail = {
  open: boolean
  mode: PreviewMode
}

function dispatch(detail: ProductPreviewDetail) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<ProductPreviewDetail>(PRODUCT_PREVIEW_EVENT, { detail }))
}

/** Ask for the preview. */
export function openProductPreview(mode: PreviewMode = 'hover') {
  dispatch({ open: true, mode })
}

/** Withdraw a hover preview. Does not dismiss one the visitor opened deliberately. */
export function closeProductPreview(mode: PreviewMode = 'hover') {
  dispatch({ open: false, mode })
}
