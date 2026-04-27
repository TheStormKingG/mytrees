import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/dashboard',   icon: '🌿', label: 'Forest'  },
  { to: '/add-tree',    icon: '＋', label: 'Plant'   },
  { to: '/carbon',      icon: '🌍', label: 'Carbon'  },
  { to: '/leaderboard', icon: '🏆', label: 'Leagues' },
  { to: '/profile',     icon: '👤', label: 'Profile' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  return (
    <div className="app-shell">
      <main className="page-container">
        {children}
      </main>

      {/* Frosted glass bottom nav */}
      <nav className="bottom-nav">
        <div className="flex justify-around items-center px-1 pt-2 pb-1">
          {navItems.map(item => {
            const active = pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className="flex flex-col items-center gap-1 px-3 py-2 transition-all"
                style={{ color: active ? 'var(--color-fg)' : 'var(--color-tertiary)' }}
              >
                <span className="text-xl leading-none relative">
                  {item.icon}
                  {active && (
                    <span
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 rounded-full"
                      style={{ height: 3, background: 'var(--accent)' }}
                    />
                  )}
                </span>
                <span style={{ fontSize: 9, fontWeight: active ? 600 : 500 }}>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
