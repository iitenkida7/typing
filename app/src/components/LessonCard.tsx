import { Link } from 'react-router-dom'
import { getBestScore } from '../lib/scores'

const CARD_COLORS = [
  'from-pink-400 to-rose-500',
  'from-orange-400 to-amber-500',
  'from-yellow-400 to-orange-400',
  'from-green-400 to-emerald-500',
  'from-teal-400 to-cyan-500',
  'from-blue-400 to-indigo-500',
  'from-purple-400 to-violet-500',
  'from-fuchsia-400 to-pink-500',
]

interface Lesson {
  emoji?: string
  description: string
  words: { [key: string]: unknown }[]
}

function getBadge(best: ReturnType<typeof getBestScore>) {
  if (!best) return null
  if (best.accuracy === 100) return { text: 'パーフェクト！', icon: '👑', bg: 'bg-yellow-400 text-yellow-900' }
  if (best.accuracy >= 90) return { text: `${best.accuracy}%`, icon: '⭐', bg: 'bg-white/90 text-yellow-500' }
  if (best.accuracy >= 70) return { text: `${best.accuracy}%`, icon: '◯', bg: 'bg-white/90 text-blue-500' }
  return { text: `${best.accuracy}%`, icon: '△', bg: 'bg-white/90 text-gray-600' }
}

export default function LessonCard({ id, lesson, index }: { id: string; lesson: Lesson; index: number }) {
  const best = getBestScore(id)
  const badge = getBadge(best)

  return (
    <Link
      key={id}
      to={`/lesson/${id}`}
      className={`group relative bg-linear-to-br ${CARD_COLORS[index % CARD_COLORS.length]} rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden text-center`}
    >
      {badge && (
        <div className={`absolute top-2 right-2 ${badge.bg} rounded-full px-2.5 py-1 flex items-center gap-1 text-sm font-bold shadow`}>
          <span>{badge.icon}</span>
          <span>{badge.text}</span>
        </div>
      )}

      <div className="text-4xl mb-2 drop-shadow-md group-hover:animate-bounce">
        {lesson.emoji ?? '📖'}
      </div>
      <div className="text-sm font-medium opacity-80">
        Lesson {index}
      </div>
      <div className="text-lg font-bold mt-1 leading-tight">
        {lesson.description}
      </div>
      <div className="text-sm opacity-70 mt-1">
        全{lesson.words.length}語
      </div>

      {!best && (
        <div className="mt-2">
          <span className="text-sm bg-white text-gray-700 font-bold px-3 py-1 rounded-full shadow-sm animate-pulse">
            → チャレンジ！
          </span>
        </div>
      )}

      <div className="absolute -right-3 -bottom-3 text-7xl opacity-10 group-hover:opacity-20 transition-opacity">
        {lesson.emoji ?? '📖'}
      </div>
    </Link>
  )
}
