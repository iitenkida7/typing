import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import lessonData from '../data/lesson.json'

type LessonDataType = typeof lessonData
const lessons = Object.keys(lessonData) as (keyof LessonDataType)[]

export default function Header() {
  const { id } = useParams<{ id: string }>()
  const [isOpen, setIsOpen] = useState(false)

  const currentIndex = lessons.indexOf(id as keyof LessonDataType)
  const currentLesson = currentIndex >= 0
    ? (lessonData as LessonDataType)[id as keyof LessonDataType]
    : null

  return (
    <nav className="flex items-center bg-white border-b px-4 py-3 mb-6">
      <Link to="/" className="font-bold text-xl mr-8 text-gray-800">
        Typing
      </Link>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1 px-3 py-2 border rounded text-gray-700 hover:bg-gray-50"
        >
          {currentLesson ? `Lesson ${currentIndex} / ${currentLesson.description}` : 'Lessons'}
          <span className="text-xs">{isOpen ? '\u25B2' : '\u25BC'}</span>
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 min-w-64 max-h-80 overflow-y-auto">
            {lessons.map((lesson, index) => {
              const isActive = id === lesson
              return (
                <Link
                  key={lesson}
                  to={`/lesson/${lesson}`}
                  className={`block px-4 py-2 ${
                    isActive
                      ? 'bg-blue-500 text-white font-bold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Lesson {index} / {(lessonData as LessonDataType)[lesson].description}
                </Link>
              )
            })}
          </div>
        )}
      </div>
      <Link
        to="/history"
        className="ml-auto px-3 py-2 text-gray-600 hover:text-blue-500 transition-colors text-sm"
      >
        りれき
      </Link>
    </nav>
  )
}
