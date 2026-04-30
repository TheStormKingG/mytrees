import { useState } from 'react'

// ── Types ────────────────────────────────────────────────────────────────────
export interface NFTCardProps {
  treeId:      string
  treeName:    string
  stage:       string
  plantedAt:   string | null
  speciesName: string | null
  carbonCoeff: number | null   // kg CO₂ / m / yr
  heightCm:    number | null   // latest LOGGED height (most recent log)
  logCount?:   number          // total number of growth logs
}

// ── Rarity tiers ─────────────────────────────────────────────────────────────
interface Rarity {
  tier:     string
  color:    string
  bg:       string
  shimmer:  string
  glow:     string
  badge:    string
  stars:    number
}

/**
 * Rarity is determined by species carbon coefficient PLUS growth tracking.
 * A well-logged tree with real height data earns a rarity boost:
 *   +1 tier if logCount >= 5 and heightCm >= 50
 *   +1 tier if logCount >= 10 and heightCm >= 150  (can stack once)
 * This means the NFT card literally levels up as you measure your tree.
 */
function getRarity(coeff: number | null, heightCm?: number | null, logCount?: number): Rarity {
  const c       = coeff ?? 1
  const logs    = logCount ?? 0
  const hcm     = heightCm ?? 0

  // Base tier from species coefficient
  let tierIndex = 0                         // 0=COMMON, 1=RARE, 2=EPIC, 3=LEGENDARY
  if (c >= 6.0) tierIndex = 3
  else if (c >= 3.5) tierIndex = 2
  else if (c >= 1.8) tierIndex = 1

  // Growth tracking boost — rewards consistent logging
  if (logs >= 5  && hcm >= 50)  tierIndex = Math.min(3, tierIndex + 1)
  if (logs >= 10 && hcm >= 150) tierIndex = Math.min(3, tierIndex + 1)

  const TIERS: Rarity[] = [
    {
      tier: 'COMMON', color: '#86efac',
      bg:   'linear-gradient(145deg,#0a1a0e 0%,#052e16 25%,#14532d 55%,#166534 75%,#22c55e 100%)',
      shimmer: 'linear-gradient(105deg, transparent 30%, rgba(134,239,172,0.25) 50%, transparent 70%)',
      glow: 'rgba(34,197,94,0.4)', badge: '#86efac', stars: 2,
    },
    {
      tier: 'RARE', color: '#60a5fa',
      bg:   'linear-gradient(145deg,#000d1a 0%,#001f3d 25%,#0c4a6e 55%,#0369a1 75%,#38bdf8 100%)',
      shimmer: 'linear-gradient(105deg, transparent 30%, rgba(96,165,250,0.35) 50%, transparent 70%)',
      glow: 'rgba(59,130,246,0.6)', badge: '#60a5fa', stars: 3,
    },
    {
      tier: 'EPIC', color: '#c084fc',
      bg:   'linear-gradient(145deg,#0d0020 0%,#1e003c 25%,#4c1d95 55%,#7c3aed 75%,#a855f7 100%)',
      shimmer: 'linear-gradient(105deg, transparent 30%, rgba(192,132,252,0.35) 50%, transparent 70%)',
      glow: 'rgba(168,85,247,0.6)', badge: '#c084fc', stars: 4,
    },
    {
      tier: 'LEGENDARY', color: '#FFD700',
      bg:   'linear-gradient(145deg,#0d0d0d 0%,#1a0a00 20%,#3d1f00 45%,#7c4a00 65%,#c68c00 80%,#FFD700 100%)',
      shimmer: 'linear-gradient(105deg, transparent 30%, rgba(255,215,0,0.35) 50%, transparent 70%)',
      glow: 'rgba(255,215,0,0.6)', badge: '#FFD700', stars: 5,
    },
  ]
  return TIERS[tierIndex]
}

const STAGE_EMOJI: Record<string, string> = {
  seed: '🌰', seedling: '🌱', sapling: '🌿', tree: '🌳',
}

const STAGE_HEIGHT_M: Record<string, number> = {
  seed: 0.05, seedling: 0.15, sapling: 0.5, tree: 2.0,
}

const CARBON_PRICE_USD_PER_KG = 0.055   // ~$55 / tonne voluntary carbon market

function calcCarbonStats(coeff: number | null, heightCm: number | null, stage: string, plantedAt: string | null) {
  const coef = coeff ?? 1.2
  const heightM = heightCm ? heightCm / 100 : STAGE_HEIGHT_M[stage] ?? 0.5
  const yearsOld = plantedAt
    ? Math.max(0.08, (Date.now() - new Date(plantedAt).getTime()) / (365.25 * 24 * 3600 * 1000))
    : 0.5
  const annualKg  = coef * heightM
  const totalKg   = annualKg * yearsOld
  const valueUSD  = totalKg * CARBON_PRICE_USD_PER_KG
  return { annualKg, totalKg, valueUSD, yearsOld, heightM }
}

function Stars({ count, color }: { count: number; color: string }) {
  return (
    <span style={{ letterSpacing: 2, fontSize: 13 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ color: i < count ? color : 'rgba(255,255,255,0.2)' }}>★</span>
      ))}
    </span>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function TreeNFTCard(props: NFTCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [shimPos, setShimPos] = useState({ x: 50, y: 50 })

  const { treeId, treeName, stage, plantedAt, speciesName, carbonCoeff, heightCm, logCount = 0 } = props
  const rarity  = getRarity(carbonCoeff, heightCm, logCount)
  const stats   = calcCarbonStats(carbonCoeff, heightCm, stage, plantedAt)
  // Height is "logged" if we have an actual measurement, otherwise it's estimated from stage
  const heightIsLogged = heightCm != null && heightCm > 0
  const tokenId = treeId.replace(/-/g, '').slice(-8).toUpperCase()

  // Subtle holographic shimmer follows pointer on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setShimPos({
      x: Math.round(((e.clientX - rect.left) / rect.width) * 100),
      y: Math.round(((e.clientY - rect.top) / rect.height) * 100),
    })
  }

  const cardW = 300
  const cardH = 420

  const cardBase: React.CSSProperties = {
    width: cardW, height: cardH,
    borderRadius: 20,
    position: 'absolute', top: 0, left: 0,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    overflow: 'hidden',
    border: `1.5px solid ${rarity.color}44`,
  }

  return (
    <div
      style={{ width: cardW, height: cardH, perspective: 900, cursor: 'pointer', userSelect: 'none' }}
      onClick={() => setFlipped(f => !f)}
      onMouseMove={handleMouseMove}
    >
      {/* Glow halo */}
      <div style={{
        position: 'absolute', inset: -16, borderRadius: 32, zIndex: -1, pointerEvents: 'none',
        boxShadow: `0 0 48px 8px ${rarity.glow}`,
        opacity: 0.7,
      }} />

      {/* Flip container */}
      <div style={{
        width: '100%', height: '100%', position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
      }}>

        {/* ───────────── FRONT ───────────── */}
        <div style={{ ...cardBase, background: rarity.bg }}>
          {/* Holographic shimmer overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
            background: `radial-gradient(circle at ${shimPos.x}% ${shimPos.y}%, rgba(255,255,255,0.12) 0%, transparent 60%)`,
            transition: 'background 0.1s',
          }} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3,
            background: rarity.shimmer,
            backgroundSize: '200% 100%',
            animation: 'shimmerSlide 3.5s linear infinite',
          }} />

          {/* Top bar */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            padding: '12px 14px 10px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(4px)',
            zIndex: 4,
          }}>
            <div>
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: 2, color: rarity.color, opacity: 0.9, textTransform: 'uppercase', marginBottom: 1 }}>
                groluv NFT
              </p>
              <Stars count={rarity.stars} color={rarity.color} />
            </div>
            <div style={{
              background: rarity.badge + '22', border: `1px solid ${rarity.badge}88`,
              borderRadius: 8, padding: '3px 8px',
            }}>
              <p style={{ fontSize: 9, fontWeight: 800, color: rarity.color, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                {rarity.tier}
              </p>
            </div>
          </div>

          {/* Species art */}
          <div style={{
            position: 'absolute', top: 60, left: 0, right: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: 160,
          }}>
            <div style={{
              fontSize: 96, lineHeight: 1,
              filter: `drop-shadow(0 0 24px ${rarity.glow})`,
              animation: 'floatBob 3s ease-in-out infinite',
            }}>
              {STAGE_EMOJI[stage] ?? '🌳'}
            </div>
          </div>

          {/* Bottom info panel */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)',
            padding: '14px 16px 16px',
            borderTop: `1px solid ${rarity.color}33`,
            zIndex: 4,
          }}>
            <p style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 2, letterSpacing: -0.5,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {treeName}
            </p>
            {speciesName && (
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginBottom: 10, fontStyle: 'italic',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {speciesName}
              </p>
            )}

            {/* Carbon & XP row */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <div style={{
                flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 10,
                padding: '8px 10px', border: `1px solid ${rarity.color}22`,
              }}>
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>
                  CO₂ / yr
                </p>
                <p style={{ fontSize: 14, fontWeight: 800, color: rarity.color }}>
                  {stats.annualKg.toFixed(1)} kg
                </p>
              </div>
              <div style={{
                flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 10,
                padding: '8px 10px', border: `1px solid ${rarity.color}22`,
              }}>
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>
                  Value
                </p>
                <p style={{ fontSize: 14, fontWeight: 800, color: '#4ade80' }}>
                  ${stats.valueUSD < 0.01 ? '<0.01' : stats.valueUSD.toFixed(2)}
                </p>
              </div>
              <div style={{
                flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 10,
                padding: '8px 10px', border: `1px solid ${rarity.color}22`,
              }}>
                <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>
                  Stage
                </p>
                <p style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.85)', textTransform: 'capitalize' }}>
                  {stage}
                </p>
              </div>
            </div>

            {/* Token ID */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', letterSpacing: 1 }}>
                #{tokenId}
              </p>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: 0.5 }}>
                tap to flip ›
              </p>
            </div>
          </div>
        </div>

        {/* ───────────── BACK ───────────── */}
        <div style={{ ...cardBase, background: rarity.bg, transform: 'rotateY(180deg)' }}>
          {/* Shimmer */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
            background: rarity.shimmer,
            backgroundSize: '200% 100%',
            animation: 'shimmerSlide 3.5s linear infinite reverse',
          }} />

          {/* Header */}
          <div style={{
            padding: '14px 16px 10px',
            borderBottom: `1px solid ${rarity.color}33`,
            background: 'rgba(0,0,0,0.5)',
            position: 'relative', zIndex: 4,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: rarity.color, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                Carbon Ledger
              </p>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>
                #{tokenId}
              </p>
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginTop: 2,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {treeName}
            </p>
          </div>

          {/* Stats grid */}
          <div style={{ padding: '14px 16px', position: 'relative', zIndex: 4 }}>
            {[
              { label: 'CO₂ Absorbed (total)',            value: `${stats.totalKg.toFixed(2)} kg`,         color: '#4ade80' },
              { label: 'CO₂ / Year',                     value: `${stats.annualKg.toFixed(2)} kg/yr`,     color: rarity.color },
              { label: 'Carbon Value (est.)',             value: `$${stats.valueUSD < 0.01 ? '<0.01' : stats.valueUSD.toFixed(3)} USD`, color: '#fbbf24' },
              { label: heightIsLogged ? 'Height ✓ Logged' : 'Height (est.)',
                                                         value: `${(stats.heightM * 100).toFixed(0)} cm`, color: heightIsLogged ? '#4ade80' : 'rgba(255,255,255,0.7)' },
              { label: 'Growth logs',                    value: `${logCount} log${logCount !== 1 ? 's' : ''}`, color: logCount >= 5 ? rarity.color : 'rgba(255,255,255,0.7)' },
              { label: 'Age',                            value: `${stats.yearsOld < 1 ? Math.round(stats.yearsOld * 12) + ' mo' : stats.yearsOld.toFixed(1) + ' yr'}`, color: 'rgba(255,255,255,0.7)' },
              { label: 'Carbon Coeff',                   value: carbonCoeff ? `${carbonCoeff} kg/m/yr` : 'Unknown', color: 'rgba(255,255,255,0.7)' },
            ].map(row => (
              <div key={row.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '9px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{row.label}</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: row.color }}>{row.value}</p>
              </div>
            ))}
          </div>

          {/* Carbon bar */}
          <div style={{ padding: '0 16px', position: 'relative', zIndex: 4 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <p style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                Lifetime CO₂ offset
              </p>
              <p style={{ fontSize: 9, color: rarity.color, fontWeight: 700 }}>
                {Math.min(100, Math.round(stats.totalKg)).toString().padStart(2, '0')} / 100 kg
              </p>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 4,
                width: `${Math.min(100, (stats.totalKg / 100) * 100)}%`,
                background: `linear-gradient(90deg, ${rarity.color}, #4ade80)`,
                transition: 'width 0.8s ease',
              }} />
            </div>
          </div>

          {/* Bottom: Planted + rarity */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '10px 16px 14px',
            background: 'rgba(0,0,0,0.5)',
            borderTop: `1px solid ${rarity.color}33`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            zIndex: 4,
          }}>
            <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
              Planted {plantedAt ? new Date(plantedAt).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
            </p>
            <div style={{
              background: rarity.badge + '22', border: `1px solid ${rarity.badge}66`,
              borderRadius: 6, padding: '2px 7px',
            }}>
              <p style={{ fontSize: 8, fontWeight: 800, color: rarity.color, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                {rarity.tier}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes injected once */}
      <style>{`
        @keyframes shimmerSlide {
          0%   { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes floatBob {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}
