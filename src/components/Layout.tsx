import { Link, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

// ── Refined SVG icons — consistent 22px, 1.7 stroke weight ─────────────────
const icons = {
  plant: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V10"/>
      <path d="M12 10C12 10 8 8.5 7 5c2.5-1 5 .5 5 5z"/>
      <path d="M12 10C12 10 16 8.5 17 5c-2.5-1-5 .5-5 5z"/>
      <path d="M9 22h6"/>
    </svg>
  ),
  forest: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L8 9H5l5 7H7l5 7 5-7h-3l5-7h-3L12 3z"/>
    </svg>
  ),
  carbon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 17.5C6.5 17.5 4 14 4 10c0-5 4-8 8-8 4.5 0 8 3 8 8 0 4.5-3 7.5-3 7.5"/>
      <path d="M12 2v18"/>
      <path d="M12 14l-3-4"/>
      <path d="M12 10l3-4"/>
    </svg>
  ),
  leagues: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3h8v9a4 4 0 0 1-8 0V3z"/>
      <path d="M8 5H5a2 2 0 0 0 0 4h3"/>
      <path d="M16 5h3a2 2 0 0 1 0 4h-3"/>
      <path d="M9 21h6"/>
      <path d="M12 17v4"/>
    </svg>
  ),
  profile: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
}

const navItems = [
  { to: '/add-tree',    icon: icons.plant,   label: 'Plant'   },
  { to: '/dashboard',   icon: icons.forest,  label: 'MyTree'  },
  { to: '/carbon',      icon: icons.carbon,  label: 'Carbon'  },
  { to: '/leaderboard', icon: icons.leagues, label: 'Leagues' },
  { to: '/profile',     icon: icons.profile, label: 'Profile' },
]

// Header height in px — keep in sync with CSS padding + image height
const HEADER_H = 88

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  // ── Tab-switch animation key ──────────────────────────────────────────────
  const prevPath    = useRef(pathname)
  const animKey     = useRef(0)
  const tabSwitching = useRef(false)
  if (prevPath.current !== pathname) {
    prevPath.current = pathname
    animKey.current += 1
    tabSwitching.current = true
  }

  // ── Scroll-based wordmark hide/show ──────────────────────────────────────
  const [scrolled, setScrolled]         = useState(false)
  const [noTransition, setNoTransition] = useState(false)

  // On tab switch: snap header to visible with no transition, reset scroll
  useEffect(() => {
    setNoTransition(true)
    setScrolled(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
    // Re-enable transitions after a frame so CSS doesn't animate the snap
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setNoTransition(false)
        tabSwitching.current = false
      })
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname])

  // Scroll listener — only updates state when NOT switching tabs
  useEffect(() => {
    const onScroll = () => {
      if (tabSwitching.current) return
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="app-shell">

      {/* ── Fixed wordmark header ────────────────────────────────────────── */}
      <header
        className="wordmark-header"
        style={{
          transform: scrolled
            ? 'translateX(-50%) translateY(-110%)'
            : 'translateX(-50%) translateY(0)',
          opacity:    scrolled ? 0 : 1,
          transition: noTransition
            ? 'none'
            : 'transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease',
        }}
      >
        <img
          src="/mytrees/logo-wordmark.png"
          alt="groluv"
          style={{ height: 60, width: 'auto' }}
        />
      </header>

      {/* ── Animated page content (extra top padding for fixed header) ───── */}
      <main
        key={animKey.current}
        className="page-container page-enter"
        style={{ paddingTop: HEADER_H + 8 }}
      >
        {children}
      </main>

      {/* ── Floating island nav ──────────────────────────────────────────── */}
      <nav className="bottom-nav">
        <div className="nav-island">
          {navItems.map(item => {
            const active = pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-label={item.label}
                style={{
                  flex: active ? '1.8' : '1',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: active ? 7 : 0,
                  minHeight: 52,
                  borderRadius: 20,
                  textDecoration: 'none',
                  padding: active ? '0 14px' : '0',
                  background: active
                    ? 'linear-gradient(148deg, var(--accent-light) 0%, var(--accent) 50%, var(--accent-dark) 100%)'
                    : 'transparent',
                  boxShadow: active
                    ? '0 4px 18px var(--accent-shadow), inset 0 1px 0 rgba(255,255,255,0.24), inset 0 -1px 0 rgba(0,0,0,0.08)'
                    : 'none',
                  transition: 'flex 0.32s cubic-bezier(0.34,1.2,0.64,1), background 0.22s ease, box-shadow 0.22s ease, padding 0.32s cubic-bezier(0.34,1.2,0.64,1)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {active && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '50%',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, transparent 100%)',
                    borderRadius: '20px 20px 0 0',
                    pointerEvents: 'none',
                  }} />
                )}
                <div style={{
                  color: active ? '#fff' : 'var(--color-tertiary)',
                  lineHeight: 0,
                  flexShrink: 0,
                  transition: 'color 0.20s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: active ? 'scale(1.08)' : 'scale(1)',
                }}>
                  {item.icon}
                </div>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  maxWidth: active ? 80 : 0,
                  opacity: active ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'max-width 0.30s cubic-bezier(0.34,1.2,0.64,1), opacity 0.22s ease',
                }}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
