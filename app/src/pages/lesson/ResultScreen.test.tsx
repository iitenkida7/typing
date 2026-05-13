import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ResultScreen from './ResultScreen'
import type { LessonState } from '../../hooks/useLessonReducer'

const mockState: LessonState = {
  phase: 'completed',
  countdown: null,
  target: { word: 'test', ja: 'テスト' },
  remains: '',
  targetChr: '',
  typingQueue: [],
  imageData: [],
  missCnt: 2,
  combo: 0,
  maxCombo: 15,
  totalKeys: 20,
  correctKeys: 18,
  wordCleared: false,
  totalWords: 10,
  completedWords: 10,
  lastPressedKey: '',
  shakeKey: false,
}

function setScores(lessonId: string, scores: any[]) {
  const data = JSON.parse(localStorage.getItem('typing-scores') || '{}')
  data[lessonId] = { scores }
  localStorage.setItem('typing-scores', JSON.stringify(data))
}

describe('ResultScreen', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders accuracy, maxCombo, totalWords, and misses from state', () => {
    const canvasRef = { current: document.createElement('canvas') }

    render(
      <ResultScreen
        state={mockState}
        lessonId="lesson1"
        nextLessonId={null}
        canvasRef={canvasRef}
        onRetry={vi.fn()}
        onNext={vi.fn()}
      />
    )

    expect(screen.getByText('90%')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
  })

  it('shows パーフェクト message when accuracy is 100', () => {
    const perfectState = { ...mockState, correctKeys: 20 }
    const canvasRef = { current: document.createElement('canvas') }

    render(
      <ResultScreen
        state={perfectState}
        lessonId="lesson1"
        nextLessonId={null}
        canvasRef={canvasRef}
        onRetry={vi.fn()}
        onNext={vi.fn()}
      />
    )

    expect(screen.getByText(/パーフェクト！すばらしい！/)).toBeInTheDocument()
    expect(screen.getByText(/クリア！/)).toBeInTheDocument()
  })

  it('shows 履歴 when history exists', () => {
    const mockHistory = [
      {
        accuracy: 90,
        maxCombo: 15,
        misses: 2,
        totalWords: 10,
        date: new Date().toISOString(),
      },
      {
        accuracy: 85,
        maxCombo: 12,
        misses: 3,
        totalWords: 10,
        date: new Date(Date.now() - 86400000).toISOString(),
      },
    ]

    setScores('lesson1', mockHistory)

    const canvasRef = { current: document.createElement('canvas') }

    render(
      <ResultScreen
        state={mockState}
        lessonId="lesson1"
        nextLessonId={null}
        canvasRef={canvasRef}
        onRetry={vi.fn()}
        onNext={vi.fn()}
      />
    )

    expect(screen.getByText(/ベストスコア/)).toBeInTheDocument()
    expect(screen.getByText('りれき（あたらしいじゅん）')).toBeInTheDocument()
  })

  it('calls onRetry when もういちど button is clicked', () => {
    const onRetry = vi.fn()
    const canvasRef = { current: document.createElement('canvas') }

    render(
      <ResultScreen
        state={mockState}
        lessonId="lesson1"
        nextLessonId={null}
        canvasRef={canvasRef}
        onRetry={onRetry}
        onNext={vi.fn()}
      />
    )

    const retryButton = screen.getByText('もういちど')
    retryButton.click()

    expect(onRetry).toHaveBeenCalled()
  })

  it('hides next lesson button when nextLessonId is null', () => {
    const canvasRef = { current: document.createElement('canvas') }

    render(
      <ResultScreen
        state={mockState}
        lessonId="lesson1"
        nextLessonId={null}
        canvasRef={canvasRef}
        onRetry={vi.fn()}
        onNext={vi.fn()}
      />
    )

    const nextButton = screen.queryByText('つぎのレッスン')
    expect(nextButton).not.toBeInTheDocument()
  })

  it('shows next lesson button when nextLessonId is provided', () => {
    const canvasRef = { current: document.createElement('canvas') }

    render(
      <ResultScreen
        state={mockState}
        lessonId="lesson1"
        nextLessonId="lesson2"
        canvasRef={canvasRef}
        onRetry={vi.fn()}
        onNext={vi.fn()}
      />
    )

    const nextButton = screen.getByText('つぎのレッスン')
    expect(nextButton).toBeInTheDocument()
  })
})
