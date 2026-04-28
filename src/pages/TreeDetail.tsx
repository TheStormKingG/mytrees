import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import type { Database } from '../types/database'
import TreeNFTCard from '../components/TreeNFTCard'

type Tree    = Database['public']['Tables']['trees']['Row']
type TreeLog = Database['public']['Tables']['tree_logs']['Row'] & {
  log_type?:   string
  media_urls?: string[]
  caption?:    string
}
type SpeciesRow = { id: string; name: string; scientific_name: string | null; carbon_coeff_kg_per_cm: number | null }

const STAGE_EMOJI:  Record<string, string> = { seed: '🌰', seedling: '🌱', sapling: '🌿', tree: '🌳' }
const HEALTH_COLOR: Record<string, string> = { excellent: '#3ab87a', good: '#5a9e6f', fair: '#d97706', poor: '#ef4444' }
const HEALTH_EMOJI: Record<string, string> = { excellent: '🌟', good: '✅', fair: '⚠️', poor: '🚨' }

// ── Share helpers ──────────────────────────────────────────────────────────
const SHARE_PLATFORMS = [
  { id: 'facebook',  label: 'Facebook',  color: '#1877F2', icon: '𝒻' },
  { id: 'whatsapp',  label: 'WhatsApp',  color: '#25D366', icon: '💬' },
  { id: 'x',         label: 'X',         color: '#000000', icon: '𝕏' },
  { id: 'instagram', label: 'Instagram', color: '#E1306C', icon: '📸' },
  { id: 'tiktok',    label: 'TikTok',    color: '#010101', icon: '🎵' },
  { id: 'linkedin',  label: 'LinkedIn',  color: '#0A66C2', icon: 'in' },
]

function buildShareUrl(platform: string, text: string, url: string): string {
  const enc = encodeURIComponent
  switch (platform) {
    case 'facebook':  return `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}&quote=${enc(text)}`
    case 'whatsapp':  return `https://wa.me/?text=${enc(text + ' ' + url)}`
    case 'x':         return `https://twitter.com/intent/tweet?text=${enc(text)}&url=${enc(url)}`
    case 'instagram': return 'https://www.instagram.com/' // deep link not possible; open app
    case 'tiktok':    return 'https://www.tiktok.com/'    // same
    case 'linkedin':  return `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}&summary=${enc(text)}`
    default: return url
  }
}

async function uploadLogFile(file: File, userId: string, treeId: string, suffix: string): Promise<string | null> {
  const ext  = file.name.split('.').pop() ?? 'jpg'
  const path = `${userId}/${treeId}_log_${suffix}_${Date.now()}.${ext}`
  const { error } = await supabase.storage.from('tree-media').upload(path, file, { upsert: false })
  if (error) return null
  const { data } = supabase.storage.from('tree-media').getPublicUrl(path)
  return data.publicUrl
}

// ── Slideshow component for planting post ─────────────────────────────────
function MediaSlideshow({ urls }: { urls: string[] }) {
  const [idx, setIdx] = useState(0)
  if (!urls.length) return (
    <div style={{ aspectRatio: '1/1', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 64 }}>
      🌱
    </div>
  )
  const current = urls[idx]
  const isVideo = /\.(mp4|mov|webm)$/i.test(current) || current.includes('video')
  return (
    <div style={{ position: 'relative', aspectRatio: '1/1', background: '#000', overflow: 'hidden' }}>
      {isVideo
        ? <video src={current} controls playsInline style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        : <img src={current} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      }
      {/* Dots */}
      {urls.length > 1 && (
        <>
          <div style={{ position: 'absolute', bottom: 10, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 5 }}>
            {urls.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} style={{
                width: i === idx ? 18 : 6, height: 6, borderRadius: 3,
                background: i === idx ? '#fff' : 'rgba(255,255,255,0.5)',
                border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.25s',
              }} />
            ))}
          </div>
          {/* Prev/next tap zones */}
          {idx > 0 && (
            <button onClick={() => setIdx(i => i - 1)} style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: '35%',
              background: 'transparent', border: 'none', cursor: 'pointer',
            }} />
          )}
          {idx < urls.length - 1 && (
            <button onClick={() => setIdx(i => i + 1)} style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: '35%',
              background: 'transparent', border: 'none', cursor: 'pointer',
            }} />
          )}
        </>
      )}
    </div>
  )
}

// ── Single growth photo display ───────────────────────────────────────────
function GrowthMedia({ urls }: { urls: string[] }) {
  if (!urls.length) return null
  return (
    <div style={{ display: 'grid', gridTemplateColumns: urls.length === 1 ? '1fr' : '1fr 1fr', gap: 2 }}>
      {urls.slice(0, 4).map((url, i) => (
        <div key={i} style={{ aspectRatio: '1/1', overflow: 'hidden', background: '#000' }}>
          <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ))}
    </div>
  )
}

// ── Share sheet ───────────────────────────────────────────────────────────
function ShareSheet({ treeName, caption, onClose }: { treeName: string; caption?: string | null; onClose: () => void }) {
  const pageUrl = window.location.href
  const text = caption
    ? `${caption} — planted ${treeName} on MyTrees 🌱`
    : `Check out my tree "${treeName}" on MyTrees! 🌱`

  const handleShare = async (platform: string) => {
    if (platform === 'instagram' || platform === 'tiktok') {
      // Use native share if available for these (can't deep link to create post)
      if (navigator.share) {
        try { await navigator.share({ title: 'MyTrees', text, url: pageUrl }) } catch { /**/ }
      } else {
        window.open(buildShareUrl(platform, text, pageUrl), '_blank')
      }
      return
    }
    window.open(buildShareUrl(platform, text, pageUrl), '_blank', 'width=600,height=500')
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 800,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 480,
        background: 'var(--surface-solid)', borderRadius: '20px 20px 0 0',
        padding: '20px 20px calc(20px + env(safe-area-inset-bottom,0px))',
        animation: 'slideUp 0.25s cubic-bezier(0.4,0,0.2,1) forwards',
      }}>
        <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-fg)', margin: 0 }}>Share this post</p>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--color-tertiary)', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {SHARE_PLATFORMS.map(p => (
            <button key={p.id} onClick={() => handleShare(p.id)} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              padding: '14px 8px', borderRadius: 14,
              background: 'var(--bg)', boxShadow: 'var(--neu-shadow-sm)',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <span style={{
                width: 40, height: 40, borderRadius: 12,
                background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, color: '#fff', fontWeight: 900,
              }}>{p.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-secondary)' }}>{p.label}</span>
            </button>
          ))}
        </div>
        {navigator.share && (
          <button onClick={async () => { try { await navigator.share({ title: 'MyTrees', text, url: pageUrl }) } catch { /**/ } onClose() }}
            style={{ width: '100%', marginTop: 12, padding: '13px 0', borderRadius: 12, border: 'none', background: 'var(--accent)', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
            More options…
          </button>
        )}
      </div>
    </div>
  )
}

// ── Post card ─────────────────────────────────────────────────────────────
function PostCard({ log, treeName, onShare }: { log: TreeLog; treeName: string; onShare: (log: TreeLog) => void }) {
  const isPlanting = log.log_type === 'planting'
  const urls = log.media_urls ?? []
  const dateStr = new Date(log.logged_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  return (
    <div style={{ background: 'var(--surface-solid)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--neu-shadow)', border: '1px solid rgba(212,219,229,0.4)' }}>

      {/* Post header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px 10px' }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
          background: isPlanting ? 'linear-gradient(135deg,#0a2a1a,#3ab87a)' : 'var(--bg)',
          boxShadow: 'var(--neu-inset-sm)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
        }}>
          {isPlanting ? '🌱' : STAGE_EMOJI[log.health] ?? '🌿'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-fg)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {treeName}
          </p>
          <p style={{ fontSize: 11, color: 'var(--color-tertiary)', margin: 0 }}>
            {isPlanting ? '🌱 Planting day' : `📏 Growth check · ${dateStr}`}
          </p>
        </div>
        {/* Share button */}
        <button onClick={() => onShare(log)} style={{
          display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px',
          borderRadius: 20, border: '1px solid var(--border)',
          background: 'var(--bg)', cursor: 'pointer', fontFamily: 'inherit',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-secondary)' }}>
            <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-secondary)' }}>Share</span>
        </button>
      </div>

      {/* Media */}
      {urls.length > 0 && (
        isPlanting
          ? <MediaSlideshow urls={urls} />
          : <GrowthMedia urls={urls} />
      )}
      {urls.length === 0 && !isPlanting && (
        <div style={{ margin: '0 14px', borderRadius: 12, background: 'var(--bg)', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>{STAGE_EMOJI['seedling']}</span>
          <p style={{ fontSize: 12, color: 'var(--color-tertiary)', margin: 0 }}>No photos for this entry</p>
        </div>
      )}

      {/* Caption / stats */}
      <div style={{ padding: '12px 14px 14px' }}>
        {log.caption && (
          <p style={{ fontSize: 14, color: 'var(--color-fg)', lineHeight: 1.55, marginBottom: 10 }}>
            {log.caption}
          </p>
        )}

        {/* Stats row */}
        {!isPlanting && (log.height_cm || log.canopy_cm || log.health) && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: log.notes ? 8 : 0 }}>
            {log.health && (
              <span style={{ fontSize: 11, fontWeight: 700, color: HEALTH_COLOR[log.health], background: `${HEALTH_COLOR[log.health]}18`, borderRadius: 8, padding: '3px 9px' }}>
                {HEALTH_EMOJI[log.health]} {log.health}
              </span>
            )}
            {log.height_cm && (
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-secondary)', background: 'var(--bg)', borderRadius: 8, padding: '3px 9px' }}>
                📏 {log.height_cm} cm tall
              </span>
            )}
            {log.canopy_cm && (
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-secondary)', background: 'var(--bg)', borderRadius: 8, padding: '3px 9px' }}>
                🌿 {log.canopy_cm} cm canopy
              </span>
            )}
          </div>
        )}
        {!isPlanting && log.notes && (
          <p style={{ fontSize: 13, color: 'var(--color-secondary)', margin: 0, lineHeight: 1.5 }}>{log.notes}</p>
        )}

        {/* Date on planting post */}
        {isPlanting && (
          <p style={{ fontSize: 11, color: 'var(--color-tertiary)', margin: 0 }}>🗓 {dateStr}</p>
        )}
      </div>
    </div>
  )
}

// ── Log form ──────────────────────────────────────────────────────────────
function LogForm({ treeId, userId, onSaved }: { treeId: string; userId: string; onSaved: (log: TreeLog) => void }) {
  const [form, setForm] = useState({ height_cm: '', canopy_cm: '', health: 'good' as TreeLog['health'], notes: '', caption: '' })
  const [closeFile,   setCloseFile]   = useState<File | null>(null)
  const [closePreview, setClosePreview] = useState<string | null>(null)
  const [bodyFile,    setBodyFile]    = useState<File | null>(null)
  const [bodyPreview, setBodyPreview] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState<string | null>(null)

  const pickFile = (e: React.ChangeEvent<HTMLInputElement>, which: 'close' | 'body') => {
    const f = e.target.files?.[0]; if (!f) return
    const url = URL.createObjectURL(f)
    if (which === 'close') { setCloseFile(f); setClosePreview(url) }
    else                   { setBodyFile(f);  setBodyPreview(url)  }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!closeFile) { setError('Close-up photo is required'); return }
    if (!bodyFile)  { setError('Full-body photo is required'); return }
    setSaving(true); setError(null)
    const [closeUrl, bodyUrl] = await Promise.all([
      uploadLogFile(closeFile, userId, treeId, 'close'),
      uploadLogFile(bodyFile,  userId, treeId, 'body'),
    ])
    const mediaUrls = [closeUrl, bodyUrl].filter(Boolean) as string[]
    const { data: log } = await supabase.from('tree_logs').insert({
      tree_id: treeId, log_type: 'growth',
      height_cm: form.height_cm ? parseFloat(form.height_cm) : null,
      canopy_cm: form.canopy_cm ? parseFloat(form.canopy_cm) : null,
      health: form.health,
      notes: form.notes || null,
      caption: form.caption || null,
      media_urls: mediaUrls,
      xp_awarded: 30,
    }).select('*').single()
    try { await supabase.rpc('award_xp', { user_id: userId, amount: 30 }) } catch { /**/ }
    setSaving(false)
    if (log) onSaved(log as TreeLog)
  }

  const PhotoPick = ({ which, file, preview, label }: { which: 'close' | 'body'; file: File | null; preview: string | null; label: string }) => (
    <div>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-secondary)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 }}>{label} <span style={{ color: '#ef4444' }}>*</span></p>
      <label style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        border: `2px ${file ? 'solid' : 'dashed'} ${file ? 'rgba(58,184,122,0.4)' : 'var(--border)'}`,
        borderRadius: 12, cursor: 'pointer', background: 'var(--bg)',
        overflow: 'hidden', aspectRatio: '1/1', minHeight: 100,
      }}>
        <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={e => pickFile(e, which)} />
        {preview
          ? <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <><span style={{ fontSize: 28, marginBottom: 4 }}>📷</span><span style={{ fontSize: 11, color: 'var(--color-tertiary)', fontWeight: 600 }}>Tap to shoot</span></>
        }
      </label>
    </div>
  )

  return (
    <div className="card" style={{ padding: 20, marginBottom: 20 }}>
      <h3 className="section-title" style={{ marginBottom: 16 }}>Today's check-in · +30 XP</h3>
      <form onSubmit={handleSave}>
        {/* Required photos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <PhotoPick which="close" file={closeFile} preview={closePreview} label="Close-up of plant" />
          <PhotoPick which="body"  file={bodyFile}  preview={bodyPreview}  label="You next to it"  />
        </div>

        {/* Measurements */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div>
            <label className="label">Height (cm)</label>
            <input className="input" type="number" value={form.height_cm} onChange={e => setForm(f => ({ ...f, height_cm: e.target.value }))} step="any" placeholder="45" />
          </div>
          <div>
            <label className="label">Canopy (cm)</label>
            <input className="input" type="number" value={form.canopy_cm} onChange={e => setForm(f => ({ ...f, canopy_cm: e.target.value }))} step="any" placeholder="20" />
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label className="label">Health</label>
          <select className="input" value={form.health} onChange={e => setForm(f => ({ ...f, health: e.target.value as TreeLog['health'] }))}>
            <option value="excellent">Excellent 🌟</option>
            <option value="good">Good ✅</option>
            <option value="fair">Fair ⚠️</option>
            <option value="poor">Poor 🚨</option>
          </select>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label className="label">Caption (optional)</label>
          <textarea className="input" value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} placeholder="How's it looking today?" rows={2} style={{ resize: 'none' }} />
        </div>

        <div style={{ marginBottom: 18 }}>
          <label className="label">Observations</label>
          <textarea className="input" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Any notes…" rows={2} style={{ resize: 'none' }} />
        </div>

        {error && <p style={{ fontSize: 12, color: '#ef4444', marginBottom: 12 }}>{error}</p>}

        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? 'Saving…' : '📏 Save log · +30 XP'}
        </button>
      </form>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function TreeDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [tree,     setTree]     = useState<Tree | null>(null)
  const [species,  setSpecies]  = useState<SpeciesRow | null>(null)
  const [logs,     setLogs]     = useState<TreeLog[]>([])
  const [showLog,  setShowLog]  = useState(false)
  const [showCard, setShowCard] = useState(false)
  const [userId,   setUserId]   = useState<string | null>(null)
  const [shareLog, setShareLog] = useState<TreeLog | null>(null)

  useEffect(() => {
    if (!id) return
    supabase.auth.getUser().then(({ data: { user } }) => { if (user) setUserId(user.id) })
    Promise.all([
      supabase.from('trees').select('*').eq('id', id).single(),
      supabase.from('tree_logs').select('*').eq('tree_id', id).order('logged_at', { ascending: false }),
    ]).then(async ([{ data: t }, { data: l }]) => {
      setTree(t); setLogs((l as TreeLog[]) ?? [])
      if (t?.species_id) {
        const { data: sp } = await supabase.from('species').select('id,name,scientific_name,carbon_coeff_kg_per_cm').eq('id', t.species_id).single()
        setSpecies(sp)
      }
    })
  }, [id])

  const handleLogSaved = (log: TreeLog) => {
    setLogs(prev => [log, ...prev])
    setShowLog(false)
  }

  if (!tree) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 260 }}>
      <div style={{ fontSize: 40 }} className="animate-bounce">🌱</div>
    </div>
  )

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <button className="btn-back" onClick={() => navigate(-1)}>←</button>
        <div>
          <p className="page-eyebrow">{STAGE_EMOJI[tree.stage]} {tree.stage}</p>
          <h1 className="page-title" style={{ fontSize: 24 }}>{tree.name}</h1>
        </div>
      </div>

      {/* Info card */}
      <div className="card" style={{ padding: 18, marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px' }}>
          <div><p className="label" style={{ marginBottom: 2 }}>Stage</p><p style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-fg)', textTransform: 'capitalize' }}>{tree.stage}</p></div>
          <div><p className="label" style={{ marginBottom: 2 }}>Planted</p><p style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-fg)' }}>{tree.planted_at ? new Date(tree.planted_at).toLocaleDateString() : '—'}</p></div>
          {species && <div style={{ gridColumn: '1/-1' }}><p className="label" style={{ marginBottom: 2 }}>Species</p><p style={{ fontSize: 13, color: 'var(--color-secondary)' }}>{species.name} · <em>{species.scientific_name}</em></p></div>}
        </div>
      </div>

      {/* Action buttons */}
      <button className="btn-primary" onClick={() => setShowCard(true)} style={{ marginBottom: 10, background: 'linear-gradient(135deg,#1e003c,#7c3aed)', border: 'none' }}>
        ✨ View NFT Card
      </button>
      <button className="btn-primary" onClick={() => setShowLog(v => !v)} style={{ marginBottom: 24 }}>
        📏 Log growth today · +30 XP
      </button>

      {/* NFT modal */}
      {showCard && (
        <div onClick={() => setShowCard(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div onClick={e => e.stopPropagation()}>
            <TreeNFTCard treeId={tree.id} treeName={tree.name} stage={tree.stage} plantedAt={tree.planted_at}
              speciesName={species ? `${species.name} · ${species.scientific_name}` : null}
              carbonCoeff={species?.carbon_coeff_kg_per_cm ?? null}
              heightCm={logs.find(l => l.height_cm)?.height_cm ?? null} />
          </div>
          <p style={{ marginTop: 20, fontSize: 12, color: 'rgba(255,255,255,0.4)', textAlign: 'center' }}>Tap outside to close</p>
        </div>
      )}

      {/* Log form */}
      {showLog && userId && <LogForm treeId={tree.id} userId={userId} onSaved={handleLogSaved} />}

      {/* Post feed */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 className="section-title">Growth history</h2>
        <p className="section-subtitle">{logs.length} posts</p>
      </div>

      {logs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-tertiary)', fontSize: 14 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>📷</div>
          No posts yet — log your first update!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 8 }}>
          {logs.map(log => (
            <PostCard key={log.id} log={log} treeName={tree.name} onShare={l => setShareLog(l)} />
          ))}
        </div>
      )}

      {/* Share sheet */}
      {shareLog && (
        <ShareSheet treeName={tree.name} caption={shareLog.caption} onClose={() => setShareLog(null)} />
      )}
    </div>
  )
}
