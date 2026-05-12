import { useState } from 'react'
import { Link } from 'react-router-dom'
import lessonData from '../data/lesson.json'

const lessons = Object.keys(lessonData)

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

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
          Lessons
          <span className="text-xs">{isOpen ? '▲' : '▼'}</span>
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border rounded shadow-lg z-10 min-w-40">
            {lessons.map((lesson) => (
              <Link
                key={lesson}
                to={`/lesson/${lesson}`}
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {lesson}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
