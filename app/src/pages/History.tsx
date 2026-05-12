import { useState } from 'react'
import { Link } from 'react-router-dom'
import lessonData from '../data/lesson.json'
import { getScores, getBestScore, clearAllScores, type ScoreEntry } from '../lib/scores'

type LessonDataType = typeof lessonData
const lessons = Object.entries(lessonData) as [keyof LessonDataType, LessonDataType[keyof LessonDataType]][]

export default function History() {
  const [, forceUpdate] = useState(0)

  const handleClearAll = () => {
    if (window.confirm('すべてのスコアをけしますか？')) {
      clearAllScores()
      forceUpdate((n) => n + 1)
    }
  }

  const hasAnyScore = lessons.some(([id]) => getScores(id).length > 0)

  return (
    <div className="mt-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        りれき
      </h2>

      {!hasAnyScore && (
        <p className="text-center text-gray-400 mt-12">まだきろくがありません</p>
      )}

      <div className="space-y-6">
        {lessons.map(([id, lesson], index) => {
          const scores = getScores(id)
          if (scores.length === 0) return null
          const best = getBestScore(id)

          return (
            <div key={id} className="bg-white rounded-2xl shadow p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{lesson.emoji}</span>
                <div>
                  <Link
                    to={`/lesson/${id}`}
                    className="font-bold text-gray-800 hover:text-blue-500 transition-colors"
                  >
                    Lesson {index} / {lesson.description}
                  </Link>
                </div>
                {best && (
                  <div className="ml-auto text-center bg-yellow-50 rounded-xl px-4 py-2">
                    <p className="text-xs text-gray-400">ベスト</p>
                    <p className="text-xl font-bold text-yellow-500">{best.accuracy}%</p>
                  </div>
                )}
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b">
                    <th className="text-left py-1 font-normal">#</th>
                    <th className="text-left py-1 font-normal">にちじ</th>
                    <th className="text-right py-1 font-normal">せいかくさ</th>
                    <th className="text-right py-1 font-normal">コンボ</th>
                    <th className="text-right py-1 font-normal">ミス</th>
                  </tr>
                </thead>
                <tbody>
                  {[...scores].reverse().map((s, i) => {
                    const isBest = best && s.date === best.date
                    return (
                      <tr key={i} className={`border-b last:border-0 ${isBest ? 'bg-yellow-50' : ''}`}>
                        <td className="py-1.5 text-gray-400">{scores.length - i}</td>
                        <td className="py-1.5 text-gray-600">
                          {new Date(s.date).toLocaleDateString('ja-JP', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-1.5 text-right font-bold text-blue-500">{s.accuracy}%</td>
                        <td className="py-1.5 text-right text-orange-500">{s.maxCombo}</td>
                        <td className="py-1.5 text-right text-red-400">{s.misses}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>

      {hasAnyScore && (
        <div className="text-center mt-10 mb-8">
          <button
            onClick={handleClearAll}
            className="text-sm text-gray-400 hover:text-red-500 border border-gray-300 hover:border-red-400 px-4 py-2 rounded-lg transition-colors"
          >
            すべてのスコアをけす
          </button>
        </div>
      )}
    </div>
  )
}
