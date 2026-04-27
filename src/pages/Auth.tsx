import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/dashboard', { replace: true })
    })
  }, [navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setMessage('Check your email to confirm your account!')
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else navigate('/dashboard', { replace: true })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c1a0e] to-[#1a2e1c] flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="text-7xl mb-3">🌳</div>
        <h1 className="text-3xl font-bold text-emerald-400 tracking-tight">MyTrees</h1>
        <p className="text-stone-400 text-sm mt-1">Grow real trees. Earn XP. Save the planet.</p>
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-stone-900 rounded-2xl p-6 border border-stone-700">
        <h2 className="text-lg font-semibold text-stone-100 mb-4">
          {isSignUp ? 'Create account' : 'Welcome back'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full bg-stone-800 border border-stone-600 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full bg-stone-800 border border-stone-600 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />

          {error && <p className="text-red-400 text-xs">{error}</p>}
          {message && <p className="text-emerald-400 text-xs">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
          >
            {loading ? '...' : isSignUp ? 'Plant your first seed 🌱' : 'Sign in'}
          </button>
        </form>

        <button
          onClick={() => { setIsSignUp(!isSignUp); setError(null); setMessage(null) }}
          className="w-full mt-3 text-stone-400 hover:text-stone-200 text-xs transition-colors"
        >
          {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  )
}
