import { Link, useLocation } from 'react-router-dom'

// ── Refined SVG icons — consistent 22px, 1.7 stroke weight ─────────────────
const icons = {
  // Plant / add: seedling sprouting from soil
  plant: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22V10"/>
      <path d="M12 10C12 10 8 8.5 7 5c2.5-1 5 .5 5 5z"/>
      <path d="M12 10C12 10 16 8.5 17 5c-2.5-1-5 .5-5 5z"/>
      <path d="M9 22h6"/>
    </svg>
  ),
  // MyTree / forest: stylised tree
  forest: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3L8 9H5l5 7H7l5 7 5-7h-3l5-7h-3L12 3z"/>
    </svg>
  ),
  // Carbon: leaf
  carbon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 17.5C6.5 17.5 4 14 4 10c0-5 4-8 8-8 4.5 0 8 3 8 8 0 4.5-3 7.5-3 7.5"/>
      <path d="M12 2v18"/>
      <path d="M12 14l-3-4"/>
      <path d="M12 10l3-4"/>
    </svg>
  ),
  // Leagues: trophy cup
  leagues: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3h8v9a4 4 0 0 1-8 0V3z"/>
      <path d="M8 5H5a2 2 0 0 0 0 4h3"/>
      <path d="M16 5h3a2 2 0 0 1 0 4h-3"/>
      <path d="M9 21h6"/>
      <path d="M12 17v4"/>
    </svg>
  ),
  // Profile: person silhouette
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

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  return (
    <div className="app-shell">
      <main className="page-container">
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
                  // Active: solid gradient green — feels like a real button
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
                {/* Subtle inner sheen on active */}
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

                {/* Icon */}
                <div style={{
                  color: active ? '#fff' : 'var(--color-tertiary)',
                  lineHeight: 0,
                  flexShrink: 0,
                  transition: 'color 0.20s ease, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: active ? 'scale(1.08)' : 'scale(1)',
                }}>
                  {item.icon}
                </div>

                {/* Label — only visible on active, slides in with overflow hidden */}
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
