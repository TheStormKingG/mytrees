import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Session } from '@supabase/supabase-js'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  if (session === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--neu-base)' }}>
        <div className="text-4xl animate-pulse">🌱</div>
      </div>
    )
  }

  if (!session) return <Navigate to="/auth" replace />

  return <>{children}</>
}
