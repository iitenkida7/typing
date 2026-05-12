import { useState } from 'react'
import { Link } from 'react-router-dom'
import lessonData from '../data/lesson.json'
import { getBestScore } from '../lib/scores'

const lessons = Object.entries(lessonData)

type Tab = 'challenge' | 'perfect'

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

function getBadge(best: ReturnType<typeof getBestScore>) {
  if (!best) return null
  if (best.accuracy === 100) return { text: 'パーフェクト！', icon: '\uD83D\uDC51', bg: 'bg-yellow-400 text-yellow-900' }
  if (best.accuracy >= 90) return { text: `${best.accuracy}%`, icon: '\u2B50', bg: 'bg-white/90 text-yellow-500' }
  if (best.accuracy >= 70) return { text: `${best.accuracy}%`, icon: '\u25CB', bg: 'bg-white/90 text-blue-500' }
  return { text: `${best.accuracy}%`, icon: '\u25B3', bg: 'bg-white/90 text-gray-600' }
}

function LessonCard({ id, lesson, index }: { id: string; lesson: (typeof lessonData)[keyof typeof lessonData]; index: number }) {
  const best = getBestScore(id)
  const badge = getBadge(best)

  return (
    <Link
      key={id}
      to={`/lesson/${id}`}
      className={`group relative bg-linear-to-br ${CARD_COLORS[index % CARD_COLORS.length]} rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden`}
    >
      {badge && (
        <div className={`absolute top-2 right-2 ${badge.bg} rounded-full px-2.5 py-1 flex items-center gap-1 text-xs font-bold shadow`}>
          <span>{badge.icon}</span>
          <span>{badge.text}</span>
        </div>
      )}

      <div className="text-4xl mb-2 drop-shadow-md group-hover:animate-bounce">
        {lesson.emoji ?? '\uD83D\uDCD6'}
      </div>
      <div className="text-xs font-medium opacity-80">
        Lesson {index}
      </div>
      <div className="text-base font-bold mt-1 leading-tight">
        {lesson.description}
      </div>
      <div className="text-xs opacity-70 mt-1">
        {lesson.words.length} ワード
      </div>

      {!best && (
        <div className="mt-2">
          <span className="text-xs bg-white text-gray-700 font-bold px-3 py-1 rounded-full shadow-sm animate-pulse">
            → チャレンジ！
          </span>
        </div>
      )}

      <div className="absolute -right-3 -bottom-3 text-7xl opacity-10 group-hover:opacity-20 transition-opacity">
        {lesson.emoji ?? '\uD83D\uDCD6'}
      </div>
    </Link>
  )
}

export default function Home() {
  const [tab, setTab] = useState<Tab>('challenge')

  const perfectLessons = lessons.filter(([id]) => {
    const best = getBestScore(id)
    return best && best.accuracy === 100
  })

  const challengeLessons = lessons.filter(([id]) => {
    const best = getBestScore(id)
    return !best || best.accuracy < 100
  })

  const perfectCount = perfectLessons.length

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        レッスンをえらぼう！
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-6">
        <button
          onClick={() => setTab('challenge')}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
            tab === 'challenge'
              ? 'bg-blue-500 text-white shadow'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          チャレンジ
          {challengeLessons.length > 0 && (
            <span className="ml-1.5 bg-white/30 px-1.5 py-0.5 rounded-full text-xs">
              {challengeLessons.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setTab('perfect')}
          className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
            tab === 'perfect'
              ? 'bg-yellow-400 text-yellow-900 shadow'
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
          }`}
        >
          {'\uD83D\uDC51'} パーフェクト
          {perfectCount > 0 && (
            <span className="ml-1.5 bg-white/30 px-1.5 py-0.5 rounded-full text-xs">
              {perfectCount}
            </span>
          )}
        </button>
      </div>

      {tab === 'challenge' && (
        <div>
          {challengeLessons.length === 0 ? (
            <p className="text-center text-gray-400 mt-12">ぜんぶパーフェクト！すごい！</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {challengeLessons.map(([id, lesson]) => {
                const index = lessons.findIndex(([lid]) => lid === id)
                return <LessonCard key={id} id={id} lesson={lesson} index={index} />
              })}
            </div>
          )}
        </div>
      )}

      {tab === 'perfect' && (
        <div>
          {perfectCount === 0 ? (
            <p className="text-center text-gray-400 mt-12">パーフェクトクリアしたレッスンがここにならぶよ！</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {perfectLessons.map(([id, lesson]) => {
                const index = lessons.findIndex(([lid]) => lid === id)
                return <LessonCard key={id} id={id} lesson={lesson} index={index} />
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
