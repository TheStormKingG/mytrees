/**
 * soundtrack.ts
 * 46 real MP3 tracks trimmed to 30 seconds each, served from public/tracks/.
 * Call randomTrackUrl() to get a URL, then loadTrack() to decode it.
 */

// All filenames present in public/tracks/
export const TRACKS: string[] = [
  'abhishekakarshana-nature-relax-343975.mp3',
  'alexgrohl-nature-behind-the-inspiration-184227.mp3',
  'atlasaudio-calm-nature-510279.mp3',
  'atlasaudio-nature-piano-519619.mp3',
  'caffeine_creek_band-nature-wonderland-112162.mp3',
  'crab_audio-unexplored-nature-278527.mp3',
  'danamusic-432hz-meditation-with-nature-sound-355840.mp3',
  'desifreemusic-nature-whispers-of-the-wild-nature-documentary-background-music-496863.mp3',
  'djovan-zen-moods-486759.mp3',
  'emmraan-unity-with-nature-282919.mp3',
  'folk_acoustic-the-beat-of-nature-122841.mp3',
  'freemusicforvideo-china-asian-china-chinese-music-495625.mp3',
  'hitslab-china-asian-china-chinese-music-474699.mp3',
  'ikoliks_aj-china-chinese-asian-music-346568.mp3',
  'ivan_luzan-beautiful-nature-163166.mp3',
  'kaazoom-moonlit-blossoms-traditional-chinese-style-music-348548.mp3',
  'kaazoom-whispers-of-the-bamboo-forest-345102.mp3',
  'leberch-atmospheric-nature-248011.mp3',
  'leberch-documentary-nature-256168.mp3',
  'leberch-documentary-nature-516419.mp3',
  'leberch-nature-437475.mp3',
  'leberch-nature-cinematic-512537.mp3',
  'levvvv-nature-293706.mp3',
  'mi_music-tranquil-nature-143092.mp3',
  'michael-x_studio-ambient-nature-sound-meditation-173384.mp3',
  'mortaz-back-to-the-nature-462661.mp3',
  'music_for_video-nature-99499.mp3',
  'musicinmedia-ambient-nature-222158.mp3',
  'musicinmedia-inspirational-nature-221487.mp3',
  'musicword-ukrainian-nature-309511.mp3',
  'musicword-voice-of-nature-296319.mp3',
  'nastelbom-asian-asian-china-chinese-music-501705.mp3',
  'nourishedbymusic-farewell-ix27ll-stay-chinese-flute-172602.mp3',
  'onaldin_music-nature-3-flying-colours-341182.mp3',
  'pulsebox-nature-397809.mp3',
  'pulsebox-nature-documentary-397812.mp3',
  'siarhei_korbut-nature-meditation-453794.mp3',
  'sonican-nature-dreams-362559.mp3',
  'sonican-nature-travel-acoustic-music-362273.mp3',
  'sonican-peaceful-music-loop-nature-wonder-302753.mp3',
  'tatamusic-cinematic-cinematic-nature-music-416071.mp3',
  'tunetank-documentary-nature-background-music-347693.mp3',
  'tunetank-documentary-nature-music-347517.mp3',
  'tunetank-nature-documentary-347262.mp3',
  'tunetank-nature-documentary-349057.mp3',
  'viacheslavstarostin-documentary-nature-background-music-387524.mp3',
  'wavemaster-fresh-nature-170712.mp3',
]

/** Returns the URL of a randomly chosen 30-second track. */
export function randomTrackUrl(): string {
  const file = TRACKS[Math.floor(Math.random() * TRACKS.length)]
  // import.meta.env.BASE_URL is '/mytrees/' in production, '/' in dev
  return `${import.meta.env.BASE_URL}tracks/${file}`
}

/**
 * Fetch a track URL and decode into an AudioBuffer owned by the given AudioContext.
 */
export async function loadTrack(url: string, ctx: AudioContext): Promise<AudioBuffer> {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`Track fetch failed: ${response.status}`)
  const arrayBuffer = await response.arrayBuffer()
  return ctx.decodeAudioData(arrayBuffer)
}

// ── Kept for compile-time compat only — not used at runtime ───────────────────
export interface TrackConfig { name: string }
/** @deprecated Use randomTrackUrl() + loadTrack() */
export function randomTrack(): TrackConfig { return { name: randomTrackUrl() } }
/** @deprecated Use loadTrack() */
export async function renderTrack(_cfg: TrackConfig, _dur: number): Promise<AudioBuffer> {
  throw new Error('renderTrack is deprecated — use randomTrackUrl() + loadTrack()')
}
