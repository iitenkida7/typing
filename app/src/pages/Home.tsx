import { Link } from 'react-router-dom'
import lessonData from '../data/lesson.json'

const lessons = Object.entries(lessonData)

export default function Home() {
  return (
    <div className="mt-8">
      <ul className="space-y-3">
        {lessons.map(([id, lesson], index) => (
          <li key={id}>
            <Link
              to={`/lesson/${id}`}
              className="text-lg text-blue-600 hover:underline"
            >
              {index} / {lesson.description}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
