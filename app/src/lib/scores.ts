const STORAGE_KEY = 'typing-scores'

export interface ScoreEntry {
  accuracy: number
  maxCombo: number
  misses: number
  totalWords: number
  date: string
}

export interface LessonScores {
  scores: ScoreEntry[]
}

type AllScores = Record<string, LessonScores>

function load(): AllScores {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function save(data: AllScores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function addScore(lessonId: string, entry: Omit<ScoreEntry, 'date'>) {
  const all = load()
  if (!all[lessonId]) {
    all[lessonId] = { scores: [] }
  }
  all[lessonId].scores.push({ ...entry, date: new Date().toISOString() })
  save(all)
}

export function getScores(lessonId: string): ScoreEntry[] {
  const all = load()
  return all[lessonId]?.scores ?? []
}

export function getBestScore(lessonId: string): ScoreEntry | null {
  const scores = getScores(lessonId)
  if (scores.length === 0) return null
  return scores.reduce((best, s) =>
    s.accuracy > best.accuracy || (s.accuracy === best.accuracy && s.maxCombo > best.maxCombo)
      ? s
      : best
  )
}

export function isCleared(lessonId: string): boolean {
  return getScores(lessonId).length > 0
}

export function getAllClearStatus(): Record<string, boolean> {
  const all = load()
  const result: Record<string, boolean> = {}
  for (const [id, data] of Object.entries(all)) {
    result[id] = data.scores.length > 0
  }
  return result
}

export function clearAllScores() {
  localStorage.removeItem(STORAGE_KEY)
}
