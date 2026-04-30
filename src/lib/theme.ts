export type Theme = 'light' | 'dark'

const KEY = 'mytrees-theme'

export function getStoredTheme(): Theme {
  try {
    const v = localStorage.getItem(KEY)
    if (v === 'light' || v === 'dark') return v
  } catch { /* private browsing */ }
  return 'light' // default
}

export function applyTheme(theme: Theme) {
  const html = document.documentElement
  html.classList.remove('theme-light', 'theme-dark')
  html.classList.add(`theme-${theme}`)
  try { localStorage.setItem(KEY, theme) } catch { /**/ }
}

/** Call once before first render — eliminates flash of wrong theme */
export function initTheme() {
  applyTheme(getStoredTheme())
}
