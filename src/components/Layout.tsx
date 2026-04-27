import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', icon: '🌿', label: 'Forest' },
  { to: '/add-tree',  icon: '➕', label: 'Plant'  },
  { to: '/carbon',    icon: '🌍', label: 'Carbon' },
  { to: '/leaderboard', icon: '🏆', label: 'Leagues' },
  { to: '/profile',   icon: '👤', label: 'Profile' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative">
      <main className="flex-1 pb-24 pt-2">
        {children}
      </main>

      {/* Neumorphic bottom nav */}
      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-2 pb-2 pt-1"
        style={{ background: 'var(--neu-base)', boxShadow: '0 -4px 8px #a3b1c6' }}
      >
        <div className="flex justify-around items-center">
          {navItems.map(item => {
            const active = pathname.startsWith(item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all text-xs font-medium ${
                  active
                    ? 'neu-pressed-sm text-emerald-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span className="text-xl leading-none">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
