import { useState } from 'react'
import lessonData from '../data/lesson.json'
import { getBestScore } from '../lib/scores'
import LessonCard from '../components/LessonCard'

const lessons = Object.entries(lessonData)

type Tab = 'challenge' | 'perfect'

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
          👑 パーフェクト
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
