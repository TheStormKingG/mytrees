import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/dashboard', label: '🌿 Forest', },
  { to: '/add-tree', label: '➕ Plant', },
  { to: '/carbon', label: '🌍 Carbon', },
  { to: '/leaderboard', label: '🏆 Leagues', },
  { to: '/profile', label: '👤 Profile', },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative">
      <main className="flex-1 pb-20">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-stone-900 border-t border-stone-700 flex justify-around items-center py-2 z-50">
        {navItems.map(item => {
          const active = pathname.startsWith(item.to)
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center text-xs px-2 py-1 rounded-lg transition-colors ${
                active
                  ? 'text-emerald-400 font-semibold'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
