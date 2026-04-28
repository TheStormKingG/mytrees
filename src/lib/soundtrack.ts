// 50 synthesized classical soundtrack configurations stored in the codebase.
// Music is generated on-the-fly via the Web Audio API — no binary files needed.

export interface TrackConfig {
  name:   string
  bpm:    number
  root:   number    // Hz of root note
  scale:  number[]  // semitone offsets from root
  melody: number[]  // scale-degree indices (values ≥ scale.length wrap to next octave)
  bass:   number[]  // bass degree indices (played one octave below melody)
}

// ── Scale definitions ──────────────────────────────────────────────────────
const MAJ:  number[] = [0, 2, 4, 5, 7, 9, 11]
const MIN:  number[] = [0, 2, 3, 5, 7, 8, 10]
const PEN:  number[] = [0, 2, 4, 7, 9]
const PMIN: number[] = [0, 3, 5, 7, 10]

// ── Root notes (Hz) ────────────────────────────────────────────────────────
const C3=130.81, D3=146.83, E3=164.81, F3=174.61, G3=196.00, A3=220.00, B3=246.94
const C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00

// ── 50-track library ───────────────────────────────────────────────────────
export const TRACK_LIBRARY: TrackConfig[] = [
  // Peaceful (60-72 BPM)
  { name:'First Leaf',          bpm:64, root:C4, scale:MAJ,  melody:[0,2,4,5,4,2,0,1],   bass:[0,4,3,4] },
  { name:'Gentle Morning',      bpm:68, root:G3, scale:PEN,  melody:[4,3,2,0,1,2,4,3],   bass:[0,2,4,2] },
  { name:'Still Waters',        bpm:60, root:A3, scale:PMIN, melody:[0,2,3,2,0,4,3,0],   bass:[0,0,2,2] },
  { name:'Woodland Path',       bpm:66, root:D4, scale:MAJ,  melody:[2,3,4,5,4,3,2,0],   bass:[0,4,4,0] },
  { name:'Misty Meadow',        bpm:72, root:E3, scale:PMIN, melody:[0,2,4,2,3,4,2,0],   bass:[0,2,0,2] },
  { name:'Soft Rain',           bpm:60, root:F3, scale:PMIN, melody:[4,3,2,0,2,3,4,2],   bass:[0,2,2,0] },
  { name:'Dewdrops',            bpm:66, root:C4, scale:PEN,  melody:[4,2,1,0,2,4,3,1],   bass:[0,4,2,4] },
  { name:'Ancient Grove',       bpm:63, root:B3, scale:MIN,  melody:[0,1,3,2,1,0,2,4],   bass:[0,5,0,3] },
  { name:'Moonlit Glade',       bpm:70, root:G3, scale:MIN,  melody:[5,4,3,2,1,0,3,5],   bass:[0,3,5,0] },
  { name:'Whisper Wind',        bpm:72, root:A4, scale:PEN,  melody:[0,1,2,4,3,2,1,0],   bass:[0,2,4,2] },
  { name:'Dawn Chorus',         bpm:64, root:D3, scale:MAJ,  melody:[3,4,5,6,5,4,3,2],   bass:[0,4,3,0] },
  { name:'Evening Bell',        bpm:60, root:E4, scale:PEN,  melody:[2,4,3,1,0,2,3,4],   bass:[0,2,0,4] },
  // Uplifting (76-88 BPM)
  { name:'New Growth',          bpm:80, root:G4, scale:MAJ,  melody:[0,2,4,5,6,5,4,2],   bass:[0,4,3,4] },
  { name:'Spring Breeze',       bpm:84, root:C4, scale:PEN,  melody:[1,2,4,3,2,1,0,4],   bass:[0,2,4,0] },
  { name:'Young Sapling',       bpm:76, root:F3, scale:MAJ,  melody:[0,2,3,5,4,2,0,1],   bass:[0,4,0,3] },
  { name:'Leafy Canopy',        bpm:80, root:A3, scale:PEN,  melody:[4,3,1,0,2,4,3,0],   bass:[4,0,2,0] },
  { name:'Rising Sap',          bpm:88, root:D4, scale:PEN,  melody:[0,1,2,4,2,1,4,3],   bass:[0,4,0,4] },
  { name:'Birdsong',            bpm:84, root:E4, scale:MAJ,  melody:[5,4,3,2,1,2,3,4],   bass:[0,3,4,0] },
  { name:'Harvest Sun',         bpm:76, root:G3, scale:MAJ,  melody:[4,5,6,5,4,3,2,1],   bass:[0,4,3,0] },
  { name:'River Melody',        bpm:80, root:B3, scale:PEN,  melody:[2,4,3,1,0,2,4,3],   bass:[0,2,0,4] },
  { name:'Forest Path',         bpm:88, root:C4, scale:MAJ,  melody:[2,4,5,4,3,2,0,1],   bass:[0,2,4,3] },
  { name:'Cedar Song',          bpm:84, root:A4, scale:MAJ,  melody:[0,1,2,3,4,3,1,0],   bass:[0,4,0,3] },
  { name:'Willow Dance',        bpm:76, root:D3, scale:PEN,  melody:[3,4,2,1,0,2,4,3],   bass:[0,2,4,2] },
  { name:'Maple Breeze',        bpm:80, root:F4, scale:PEN,  melody:[1,0,2,4,3,1,2,4],   bass:[0,2,0,4] },
  // Gentle / Nostalgic (84-96 BPM, minor)
  { name:'Autumn Shade',        bpm:84, root:A3, scale:MIN,  melody:[0,2,3,5,4,3,2,0],   bass:[0,5,3,0] },
  { name:'Old Pine',            bpm:88, root:E3, scale:MIN,  melody:[5,4,3,2,1,0,2,4],   bass:[0,3,5,3] },
  { name:'Mossy Stone',         bpm:90, root:D4, scale:PMIN, melody:[0,2,3,0,4,3,2,0],   bass:[0,4,0,2] },
  { name:'Fading Ember',        bpm:86, root:G3, scale:MIN,  melody:[4,3,2,1,2,3,5,4],   bass:[0,5,0,3] },
  { name:'Twilight Roots',      bpm:92, root:C4, scale:PMIN, melody:[3,4,2,0,1,3,4,2],   bass:[0,3,0,4] },
  { name:'Frost Blossom',       bpm:84, root:B3, scale:PMIN, melody:[0,3,4,2,0,4,3,0],   bass:[0,2,4,2] },
  { name:'River Stones',        bpm:90, root:F3, scale:MIN,  melody:[2,3,5,4,3,2,0,1],   bass:[0,5,3,5] },
  { name:'Earthen Path',        bpm:88, root:A4, scale:PMIN, melody:[4,3,2,0,3,4,2,0],   bass:[0,4,0,2] },
  { name:'Dusk Rain',           bpm:84, root:E4, scale:MIN,  melody:[0,1,3,5,4,3,1,0],   bass:[0,3,5,3] },
  { name:'Lone Birch',          bpm:92, root:G4, scale:PMIN, melody:[2,0,4,3,2,0,4,3],   bass:[0,2,0,4] },
  { name:'Deep Roots',          bpm:86, root:C3, scale:MIN,  melody:[5,4,3,2,3,4,5,6],   bass:[0,3,5,0] },
  { name:'Weathered Bark',      bpm:90, root:D3, scale:PMIN, melody:[0,4,3,0,2,4,0,2],   bass:[0,2,4,0] },
  { name:'Silent Leaf',         bpm:84, root:F4, scale:MIN,  melody:[3,2,1,0,2,3,5,4],   bass:[0,5,0,3] },
  // Reflective (66-80 BPM, mixed)
  { name:'Memory Tree',         bpm:72, root:A3, scale:MIN,  melody:[0,3,5,3,2,0,1,3],   bass:[0,5,3,5] },
  { name:'Quiet Persistence',   bpm:66, root:G3, scale:PMIN, melody:[2,4,3,0,2,4,3,2],   bass:[0,4,2,0] },
  { name:'Patience',            bpm:70, root:C4, scale:MIN,  melody:[0,2,3,2,1,0,3,5],   bass:[0,3,0,5] },
  { name:'Rooted',              bpm:76, root:E3, scale:PMIN, melody:[4,2,0,3,4,2,0,4],   bass:[0,2,4,2] },
  { name:'Canopy Dream',        bpm:68, root:D4, scale:MIN,  melody:[5,3,2,1,0,2,3,5],   bass:[0,5,3,0] },
  { name:'Elder Oak',           bpm:72, root:F3, scale:PMIN, melody:[0,3,2,4,3,0,2,4],   bass:[0,4,0,2] },
  { name:'Seedling Hope',       bpm:66, root:B3, scale:MIN,  melody:[0,1,3,2,0,3,5,4],   bass:[0,3,5,3] },
  { name:'Long Journey',        bpm:76, root:A4, scale:PMIN, melody:[3,0,4,2,3,4,2,0],   bass:[0,2,0,4] },
  { name:'Healing Earth',       bpm:70, root:G4, scale:MIN,  melody:[2,3,5,4,2,1,0,2],   bass:[0,5,0,3] },
  { name:'Promise',             bpm:68, root:C3, scale:PEN,  melody:[4,3,1,0,2,4,3,1],   bass:[0,4,2,4] },
  { name:'Tenacity',            bpm:72, root:D3, scale:PEN,  melody:[0,2,4,3,1,0,4,2],   bass:[0,2,4,0] },
  { name:'Connected',           bpm:76, root:E4, scale:PMIN, melody:[0,2,4,3,2,0,3,4],   bass:[0,2,0,4] },
  { name:'Future Shade',        bpm:80, root:F4, scale:MAJ,  melody:[4,5,6,4,3,2,1,0],   bass:[0,4,3,0] },
]

// ── Helpers ────────────────────────────────────────────────────────────────

/** Convert a scale-degree index to Hz, with optional octave offset. */
function degreeToHz(root: number, scale: number[], degree: number, octaveOffset = 0): number {
  const d = Math.max(0, degree)
  const semitones = scale[d % scale.length] + (Math.floor(d / scale.length) + octaveOffset) * 12
  return root * Math.pow(2, semitones / 12)
}

/** Schedule a piano-like note on an OfflineAudioContext. */
function scheduleNote(
  ctx: OfflineAudioContext,
  freq: number,
  startTime: number,
  duration: number,
  volume = 0.28,
) {
  const maxTime = ctx.length / ctx.sampleRate - 0.01
  if (startTime >= maxTime) return
  const end = Math.min(startTime + duration, maxTime)

  // Primary tone — triangle gives warm, piano-like body
  const osc = ctx.createOscillator()
  const env = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.value = freq
  env.gain.setValueAtTime(0.0001, startTime)
  env.gain.linearRampToValueAtTime(volume,        startTime + 0.012)
  env.gain.exponentialRampToValueAtTime(volume * 0.45, startTime + 0.09)
  env.gain.setValueAtTime(volume * 0.45, end - 0.04)
  env.gain.linearRampToValueAtTime(0.0001, end)
  osc.connect(env); env.connect(ctx.destination)
  osc.start(startTime); osc.stop(end + 0.01)

  // 2nd harmonic — sine adds a touch of brightness
  const osc2 = ctx.createOscillator()
  const env2 = ctx.createGain()
  osc2.type = 'sine'
  osc2.frequency.value = freq * 2
  env2.gain.setValueAtTime(0.0001, startTime)
  env2.gain.linearRampToValueAtTime(volume * 0.11, startTime + 0.01)
  env2.gain.exponentialRampToValueAtTime(0.0001,   startTime + 0.18)
  osc2.connect(env2); env2.connect(ctx.destination)
  osc2.start(startTime); osc2.stop(startTime + 0.2)
}

/**
 * Render a track configuration to an AudioBuffer.
 * Uses OfflineAudioContext so rendering is fast (not real-time).
 */
export async function renderTrack(cfg: TrackConfig, duration: number): Promise<AudioBuffer> {
  const SR  = 44100
  const ctx = new OfflineAudioContext(2, Math.ceil(SR * (duration + 1)), SR)

  const beatDur = 60 / cfg.bpm
  const noteDur = beatDur * 0.72  // slight gap between notes

  // Melody — one note per beat
  for (let beat = 0; beat * beatDur < duration; beat++) {
    const deg  = cfg.melody[beat % cfg.melody.length]
    const freq = degreeToHz(cfg.root, cfg.scale, deg, 0)
    scheduleNote(ctx, freq, beat * beatDur, noteDur, 0.27)
  }

  // Bass — one note every two beats, one octave lower
  const bassBeat = beatDur * 2
  for (let beat = 0; beat * bassBeat < duration; beat++) {
    const deg  = cfg.bass[beat % cfg.bass.length]
    const freq = degreeToHz(cfg.root, cfg.scale, deg, -1)
    scheduleNote(ctx, freq, beat * bassBeat, bassBeat * 0.68, 0.17)
  }

  return ctx.startRendering()
}

/** Pick one track at random. */
export function randomTrack(): TrackConfig {
  return TRACK_LIBRARY[Math.floor(Math.random() * TRACK_LIBRARY.length)]
}
