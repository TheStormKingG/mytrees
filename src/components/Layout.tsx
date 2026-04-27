import { Link, useLocation } from 'react-router-dom'

// Clean stroke SVG icons — no emojis
const icons = {
  forest: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L8 8H4l4 6H5l7 8 7-8h-3l4-6h-4L12 2z"/>
    </svg>
  ),
  plant: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="9"/>
      <line x1="12" y1="7" x2="12" y2="17"/>
      <line x1="7" y1="12" x2="17" y2="12"/>
    </svg>
  ),
  carbon: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/>
      <path d="M3 12h18"/>
      <path d="M12 3c-3 4-3 14 0 18"/>
      <path d="M12 3c3 4 3 14 0 18"/>
    </svg>
  ),
  leagues: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l-2 7H8L6 3z"/>
      <path d="M8 10c0 4 4 7 4 7s4-3 4-7"/>
      <path d="M9 21h6"/>
      <path d="M12 17v4"/>
    </svg>
  ),
  profile: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/>
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    </svg>
  ),
}

const navItems = [
  { to: '/dashboard',   icon: icons.forest,  label: 'Forest'  },
  { to: '/add-tree',    icon: icons.plant,   label: 'Plant'   },
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

      <nav className="bottom-nav">
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px 4px 6px' }}>
          {navItems.map(item => {
            const active = pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 5,
                  padding: '2px 12px',
                  textDecoration: 'none',
                  color: active ? 'var(--color-fg)' : 'var(--color-tertiary)',
                  transition: 'color 0.15s',
                  minWidth: 52,
                }}
              >
                {/* Icon + accent dot container */}
                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ color: active ? 'var(--color-fg)' : 'var(--color-tertiary)', lineHeight: 0 }}>
                    {item.icon}
                  </div>
                  {/* Accent pill directly below icon */}
                  <div style={{
                    height: 3,
                    width: active ? 18 : 0,
                    borderRadius: 99,
                    background: 'var(--accent)',
                    transition: 'width 0.2s ease',
                  }} />
                </div>

                {/* Label */}
                <span style={{
                  fontSize: 10,
                  fontWeight: active ? 700 : 500,
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  color: active ? 'var(--color-fg)' : 'var(--color-tertiary)',
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
