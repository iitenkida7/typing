import Word from '../../components/Word'
import Images from '../../components/Images'
import Char from '../../components/Char'
import Keyboard from '../../components/Keyboard'
import type { LessonState } from '../../hooks/useLessonReducer'

interface PlayingScreenProps {
  state: LessonState
  canvasRef: React.RefObject<HTMLCanvasElement>
  onSpeak: () => void
}

const COMBO_MESSAGES = [
  { threshold: 30, message: 'カンペキ！！', color: 'text-yellow-400' },
  { threshold: 20, message: 'すごすぎる！', color: 'text-orange-400' },
  { threshold: 10, message: 'いいかんじ！', color: 'text-pink-400' },
  { threshold: 5, message: 'ナイス！', color: 'text-blue-400' },
  { threshold: 3, message: 'グッド！', color: 'text-green-400' },
]

function getComboMessage(combo: number) {
  for (const { threshold, message, color } of COMBO_MESSAGES) {
    if (combo >= threshold) return { message: `${combo}コンボ！ ${message}`, color }
  }
  return null
}

export default function PlayingScreen({ state, canvasRef, onSpeak }: PlayingScreenProps) {
  const accuracy = state.totalKeys > 0 ? Math.round((state.correctKeys / state.totalKeys) * 100) : 100
  const comboInfo = getComboMessage(state.combo)

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>
            {state.completedWords} / {state.totalWords} ワード
          </span>
          <span>せいかくさ {accuracy}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${state.totalWords > 0 ? (state.completedWords / state.totalWords) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* Combo display */}
      <div className="h-8 text-center">
        {comboInfo && (
          <span className={`text-xl font-bold ${comboInfo.color} animate-bounce inline-block`}>
            {comboInfo.message}
          </span>
        )}
      </div>

      {/* Typing area with corner images */}
      <div className="relative">
        {/* Images in corners, behind content */}
        <Images imageData={state.imageData} word={state.target.word} />

        <div className={`relative z-10 ${state.wordCleared ? 'animate-[wordClear_0.6s_ease-out]' : ''}`}>
          <Word ja={state.target.ja} word={state.target.word} onSpeak={onSpeak} />
        </div>
        <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-50" />
        <div className="relative z-10">
          <Char word={state.target.word} remains={state.remains} />
        </div>
        <div className="relative z-10">
          <Keyboard
            targetChr={state.targetChr.toUpperCase()}
            lastPressedKey={state.lastPressedKey}
            shakeKey={state.shakeKey}
          />
        </div>
      </div>
    </div>
  )
}
