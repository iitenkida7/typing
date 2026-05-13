import { useParams, useNavigate } from 'react-router-dom'
import lessonData from '../data/lesson.json'
import { useLessonReducer } from '../hooks/useLessonReducer'
import StartScreen from './lesson/StartScreen'
import PlayingScreen from './lesson/PlayingScreen'
import ResultScreen from './lesson/ResultScreen'

type LessonDataType = typeof lessonData
const LESSON_KEYS = Object.keys(lessonData)

function CountdownOverlay({ value }: { value: number | null }) {
  if (value === null) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <span className="text-9xl font-bold text-white animate-ping">{value}</span>
    </div>
  )
}

export default function Lesson() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { state, canvasRef, startCountdown, retry } = useLessonReducer(id)

  const lessonObj = id ? (lessonData as LessonDataType)[id as keyof LessonDataType] : null

  if (!lessonObj) {
    return (
      <div className="text-center mt-16">
        <p className="text-6xl mb-4">😵</p>
        <p className="text-2xl font-bold text-gray-700 mb-2">レッスンがみつかりません</p>
        <p className="text-gray-400 mb-8">「{id}」というレッスンはありません</p>
        <button
          onClick={() => navigate('/')}
          className="bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-lg px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          ホームにもどる
        </button>
      </div>
    )
  }

  const currentIndex = LESSON_KEYS.indexOf(id ?? '')
  const nextLessonId = LESSON_KEYS[currentIndex + 1] ?? null

  return (
    <div>
      <p className="text-sm lg:text-base text-gray-400 mb-2">{lessonObj?.description ?? id}</p>

      <CountdownOverlay value={state.countdown} />

      {state.phase === 'idle' && <StartScreen lessonObj={lessonObj ?? undefined} onStart={startCountdown} />}

      {state.phase === 'countdown' && <StartScreen lessonObj={lessonObj ?? undefined} onStart={startCountdown} />}

      {state.phase === 'playing' && (
        <PlayingScreen state={state} canvasRef={canvasRef} onSpeak={() => {}} />
      )}

      {state.phase === 'completed' && (
        <ResultScreen
          state={state}
          lessonId={id!}
          nextLessonId={nextLessonId}
          canvasRef={canvasRef}
          onRetry={retry}
          onNext={() => navigate(`/lesson/${nextLessonId}`)}
        />
      )}
    </div>
  )
}
