import { getScores, getBestScore } from '../../lib/scores'
import type { LessonState } from '../../hooks/useLessonReducer'

interface ResultScreenProps {
  state: LessonState
  lessonId: string
  nextLessonId: string | null
  canvasRef: React.RefObject<HTMLCanvasElement>
  onRetry: () => void
  onNext: () => void
}

export default function ResultScreen({
  state,
  lessonId,
  nextLessonId,
  canvasRef,
  onRetry,
  onNext,
}: ResultScreenProps) {
  const accuracy = state.totalKeys > 0 ? Math.round((state.correctKeys / state.totalKeys) * 100) : 100
  const { missCnt } = state

  const history = getScores(lessonId)
  const best = getBestScore(lessonId)

  return (
    <div className="text-center mt-8">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />
      <div className="relative z-10 animate-[fadeInUp_0.5s_ease-out]">
        {accuracy === 100 ? (
          <>
            <p className="text-5xl font-bold mb-4 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              クリア！
            </p>
            <p className="text-6xl mb-6">&#x1F389;</p>
          </>
        ) : (
          <>
            <p className="text-3xl font-bold mb-4 text-orange-500">あと少し！パーフェクトをめざそう！</p>
            <p className="text-6xl mb-6">&#x1F4AA;</p>
          </>
        )}

        {/* Score card */}
        <div className="inline-block bg-white rounded-2xl shadow-xl p-6 mb-8 text-left">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">せいかくさ</p>
              <p className="text-3xl font-bold text-blue-500">{accuracy}%</p>
            </div>
            <div className="bg-orange-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">さいだいコンボ</p>
              <p className="text-3xl font-bold text-orange-500">{state.maxCombo}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">ワードすう</p>
              <p className="text-3xl font-bold text-green-500">{state.totalWords}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4">
              <p className="text-sm text-gray-500">ミス</p>
              <p className="text-3xl font-bold text-red-500">{missCnt}</p>
            </div>
          </div>
          {accuracy === 100 && (
            <p className="text-center mt-4 text-yellow-500 font-bold text-lg animate-pulse">
              パーフェクト！すばらしい！
            </p>
          )}
          {accuracy >= 90 && accuracy < 100 && (
            <p className="text-center mt-4 text-blue-500 font-bold text-lg">とってもじょうず！</p>
          )}
          {accuracy >= 70 && accuracy < 90 && (
            <p className="text-center mt-4 text-green-500 font-bold text-lg">よくがんばったね！</p>
          )}
          {accuracy < 70 && (
            <p className="text-center mt-4 text-purple-500 font-bold text-lg">
              もういちどチャレンジしよう！
            </p>
          )}
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="inline-block bg-white rounded-2xl shadow-xl p-6 mb-8 text-left w-full max-w-md">
            {best && (
              <div className="mb-4 p-3 bg-yellow-50 rounded-xl text-center">
                <p className="text-sm text-gray-500">ベストスコア</p>
                <p className="text-2xl font-bold text-yellow-500">{best.accuracy}%</p>
                <p className="text-xs text-gray-400">コンボ {best.maxCombo}</p>
              </div>
            )}
            <p className="text-sm font-bold text-gray-600 mb-2">りれき（あたらしいじゅん）</p>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {[...history].reverse().slice(0, 10).map((s, i) => (
                <div key={i} className="flex justify-between text-sm px-2 py-1 rounded bg-gray-50">
                  <span className="text-gray-500">{new Date(s.date).toLocaleDateString('ja-JP')}</span>
                  <span className="font-bold text-blue-500">{s.accuracy}%</span>
                  <span className="text-gray-400">コンボ {s.maxCombo}</span>
                  <span className="text-red-400">ミス {s.misses}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button
            className={`text-xl px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${
              accuracy === 100
                ? 'bg-linear-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white'
                : 'bg-linear-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white animate-pulse'
            }`}
            onClick={onRetry}
          >
            もういちど
            <span className="block text-xs opacity-70 mt-1">R キー</span>
          </button>
          {nextLessonId && (
            <button
              className={`text-xl px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${
                accuracy === 100
                  ? 'bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                  : 'bg-gray-200 text-gray-400 hover:bg-gray-300 hover:text-gray-500'
              }`}
              onClick={onNext}
            >
              つぎのレッスン
              <span className="block text-xs opacity-70 mt-1">Space / Enter</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
