import { Link } from 'react-router-dom'
import lessonData from '../data/lesson.json'

const lessons = Object.entries(lessonData)

const LESSON_EMOJIS: Record<string, string> = {
  lesson000: '\u{1F524}',
  lesson001: '\u{1F308}',
  lesson002: '\u{1F30A}',
  lesson003: '\u{1F981}',
  lesson004: '\u{1F354}',
  lesson005: '\u{1F3C4}',
  lesson006: '\u{1F966}',
  lesson007: '\u{1F34E}',
  lesson008: '\u{1F697}',
  lesson009: '\u{1F9D2}',
  lesson010: '\u{1F3E0}',
  lesson011: '\u{1F3EB}',
  lesson012: '\u{2600}\uFE0F',
  lesson013: '\u26BD',
  lesson014: '\u{1F468}\u200D\u{1F373}',
  lesson015: '\u{1F522}',
  lesson016: '\u{1F44B}',
  lesson017: '\u{1F333}',
  lesson018: '\u{1F98B}',
  lesson019: '\u{1F30D}',
}

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

export default function Home() {
  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        レッスンをえらぼう！
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {lessons.map(([id, lesson], index) => (
          <Link
            key={id}
            to={`/lesson/${id}`}
            className={`group relative bg-linear-to-br ${CARD_COLORS[index % CARD_COLORS.length]} rounded-2xl p-4 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden`}
          >
            <div className="text-4xl mb-2 drop-shadow-md group-hover:animate-bounce">
              {LESSON_EMOJIS[id] ?? '\u{1F4D6}'}
            </div>
            <div className="text-xs font-medium opacity-80">
              Lesson {index}
            </div>
            <div className="text-base font-bold mt-1 leading-tight">
              {lesson.description}
            </div>
            <div className="text-xs opacity-70 mt-1">
              {lesson.words.length} もじ
            </div>
            <div className="absolute -right-3 -bottom-3 text-7xl opacity-10 group-hover:opacity-20 transition-opacity">
              {LESSON_EMOJIS[id] ?? '\u{1F4D6}'}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
