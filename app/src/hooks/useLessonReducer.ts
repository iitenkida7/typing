import { useCallback, useEffect, useLayoutEffect, useReducer, useRef } from 'react'
import confetti from 'canvas-confetti'
import lessonData from '../data/lesson.json'
import { addScore, type ScoreEntry } from '../lib/scores'

export interface LessonWord {
  word: string
  ja: string
}

type LessonDataType = typeof lessonData

export type LessonPhase = 'idle' | 'countdown' | 'playing' | 'completed'

export interface LessonState {
  phase: LessonPhase
  countdown: number | null
  target: LessonWord
  remains: string
  targetChr: string
  typingQueue: LessonWord[]
  imageData: LessonWord[]
  missCnt: number
  combo: number
  maxCombo: number
  totalKeys: number
  correctKeys: number
  wordCleared: boolean
  totalWords: number
  completedWords: number
  lastPressedKey: string
  shakeKey: boolean
}

export type LessonAction =
  | { type: 'INIT'; words: LessonWord[] }
  | { type: 'COUNTDOWN_START'; words: LessonWord[] }
  | { type: 'COUNTDOWN_TICK'; value: number }
  | { type: 'START'; words: LessonWord[] }
  | { type: 'KEY_HIT'; key: string }
  | { type: 'KEY_MISS'; key: string }
  | { type: 'COMPLETE' }
  | { type: 'WORD_CLEARED_DONE' }
  | { type: 'SHAKE_DONE' }
  | { type: 'RETRY'; words: LessonWord[] }

const initialState: LessonState = {
  phase: 'idle',
  countdown: null,
  target: { word: '', ja: '' },
  remains: '',
  targetChr: '',
  typingQueue: [],
  imageData: [],
  missCnt: 0,
  combo: 0,
  maxCombo: 0,
  totalKeys: 0,
  correctKeys: 0,
  wordCleared: false,
  totalWords: 0,
  completedWords: 0,
  lastPressedKey: '',
  shakeKey: false,
}

export function lessonReducer(state: LessonState, action: LessonAction): LessonState {
  switch (action.type) {
    case 'INIT': {
      return {
        ...initialState,
        imageData: action.words,
      }
    }

    case 'COUNTDOWN_START': {
      return {
        ...state,
        phase: 'countdown',
        countdown: 3,
      }
    }

    case 'COUNTDOWN_TICK': {
      return {
        ...state,
        countdown: action.value,
      }
    }

    case 'START': {
      const [first, ...rest] = action.words
      return {
        ...state,
        phase: 'playing',
        countdown: null,
        target: first,
        remains: first.word,
        targetChr: first.word.charAt(0),
        typingQueue: rest,
        totalWords: action.words.length,
        completedWords: 0,
        totalKeys: 0,
        correctKeys: 0,
        combo: 0,
        maxCombo: 0,
        missCnt: 0,
      }
    }

    case 'KEY_HIT': {
      if (state.phase !== 'playing') return state

      const newCombo = state.combo + 1
      const newMaxCombo = Math.max(state.maxCombo, newCombo)
      const newRemains = state.remains.substring(1)
      const newTargetChr = newRemains.charAt(0)
      const newCorrectKeys = state.correctKeys + 1
      const newTotalKeys = state.totalKeys + 1

      if (newRemains.length === 0) {
        // Word completed
        const newCompletedWords = state.completedWords + 1

        if (state.typingQueue.length > 0) {
          // More words to go
          const [nextWord, ...restWords] = state.typingQueue
          return {
            ...state,
            target: nextWord,
            remains: nextWord.word,
            targetChr: nextWord.word.charAt(0),
            typingQueue: restWords,
            combo: newCombo,
            maxCombo: newMaxCombo,
            correctKeys: newCorrectKeys,
            totalKeys: newTotalKeys,
            completedWords: newCompletedWords,
            wordCleared: true,
            lastPressedKey: action.key.toUpperCase(),
            shakeKey: false,
          }
        } else {
          // All words done
          return {
            ...state,
            phase: 'completed',
            combo: newCombo,
            maxCombo: newMaxCombo,
            correctKeys: newCorrectKeys,
            totalKeys: newTotalKeys,
            completedWords: newCompletedWords,
            lastPressedKey: action.key.toUpperCase(),
          }
        }
      }

      // Partial word
      return {
        ...state,
        remains: newRemains,
        targetChr: newTargetChr,
        combo: newCombo,
        maxCombo: newMaxCombo,
        correctKeys: newCorrectKeys,
        totalKeys: newTotalKeys,
        lastPressedKey: action.key.toUpperCase(),
        shakeKey: false,
      }
    }

    case 'KEY_MISS': {
      if (state.phase !== 'playing') return state

      return {
        ...state,
        totalKeys: state.totalKeys + 1,
        combo: 0,
        missCnt: state.missCnt + 1,
        lastPressedKey: action.key.toUpperCase(),
        shakeKey: true,
      }
    }

    case 'WORD_CLEARED_DONE': {
      return {
        ...state,
        wordCleared: false,
      }
    }

    case 'SHAKE_DONE': {
      return {
        ...state,
        shakeKey: false,
      }
    }

    case 'COMPLETE': {
      return {
        ...state,
        phase: 'completed',
      }
    }

    case 'RETRY': {
      const [first, ...rest] = action.words
      return {
        ...state,
        phase: 'idle',
        countdown: null,
        target: first,
        remains: first.word,
        targetChr: first.word.charAt(0),
        typingQueue: rest,
        totalWords: 0,
        completedWords: 0,
        totalKeys: 0,
        correctKeys: 0,
        combo: 0,
        maxCombo: 0,
        missCnt: 0,
        wordCleared: false,
        lastPressedKey: '',
        shakeKey: false,
      }
    }

    default:
      return state
  }
}

interface UseLessonReducerReturn {
  state: LessonState
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  startCountdown: () => void
  retry: () => void
}

export function useLessonReducer(lessonId?: string): UseLessonReducerReturn {
  const [state, dispatch] = useReducer(lessonReducer, initialState)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef(state)

  // Keep stateRef in sync with state
  useLayoutEffect(() => {
    stateRef.current = state
  }, [state])

  // Initialize when lesson ID changes
  useEffect(() => {
    if (!lessonId) return
    const lesson = (lessonData as LessonDataType)[lessonId as keyof LessonDataType]
    if (!lesson) return

    const words: LessonWord[] = JSON.parse(JSON.stringify(lesson.words))
    dispatch({ type: 'INIT', words })
  }, [lessonId])

  // Speech synthesis initialization
  useEffect(() => {
    const load = () => window.speechSynthesis.getVoices()
    load()
    window.speechSynthesis.onvoiceschanged = load
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  const speech = (text: string) => {
    const voices = window.speechSynthesis.getVoices()
    const enVoices = voices.filter((v) => v.lang.startsWith('en'))
    const voice =
      enVoices.find((v) => v.name === 'Victoria') ??
      enVoices.find((v) => v.name === 'Samantha') ??
      enVoices.find((v) => v.lang === 'en-US') ??
      enVoices[0] ??
      null
    const utter = new SpeechSynthesisUtterance()
    utter.lang = 'en-US'
    if (voice) utter.voice = voice
    utter.rate = 0.75
    utter.text = text
    window.speechSynthesis.speak(utter)
  }

  const cracker = (big = false) => {
    if (!canvasRef.current) return
    confetti.create(canvasRef.current, { resize: true })({
      shapes: big ? ['circle', 'square'] : ['square'],
      particleCount: big ? 80 : 20,
      spread: big ? 180 : 120,
      origin: { y: 1, x: 0.5 },
      colors: big
        ? ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd']
        : undefined,
    })
  }

  const celebrateCompletion = () => {
    if (!canvasRef.current) return
    const fire = confetti.create(canvasRef.current, { resize: true })
    const shots = [
      { origin: { x: 0.2, y: 0.8 } },
      { origin: { x: 0.5, y: 0.7 } },
      { origin: { x: 0.8, y: 0.8 } },
    ]
    shots.forEach((shot, i) => {
      setTimeout(() => {
        fire({
          particleCount: 100,
          spread: 160,
          shapes: ['circle', 'square'],
          colors: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3'],
          ...shot,
        })
      }, i * 300)
    })
  }

  const playDram = () => new Audio('/sounds/dram.mp3').play()
  const playBeep = () => new Audio('/sounds/beep.mp3').play()

  const startCountdown = () => {
    if (!lessonId) return
    const lesson = (lessonData as LessonDataType)[lessonId as keyof LessonDataType]
    if (!lesson) return

    const words: LessonWord[] = JSON.parse(JSON.stringify(lesson.words))
    const shuffled = words.sort(() => Math.random() - 0.5)

    dispatch({ type: 'COUNTDOWN_START', words: shuffled })
  }

  const retry = () => {
    if (!lessonId) return
    const lesson = (lessonData as LessonDataType)[lessonId as keyof LessonDataType]
    if (!lesson) return

    const words: LessonWord[] = JSON.parse(JSON.stringify(lesson.words))
    const shuffled = words.sort(() => Math.random() - 0.5)

    dispatch({ type: 'RETRY', words: shuffled })
  }

  // Key press handler
  const keyPress = useCallback((event: KeyboardEvent) => {
    const s = stateRef.current

    // Idle or countdown: Space or Enter to start
    if ((s.phase === 'idle' || s.phase === 'countdown') && (event.key === ' ' || event.key === 'Enter')) {
      event.preventDefault()
      startCountdown()
      return
    }

    // Completed: R to retry, Enter/Space for next
    if (s.phase === 'completed') {
      if (event.key === 'r' || event.key === 'R') {
        event.preventDefault()
        retry()
      }
      return
    }

    // Playing phase
    if (s.phase !== 'playing') return

    const currentChr = s.targetChr
    const currentRemains = s.remains

    if (currentChr.toLowerCase() === event.key.toLowerCase()) {
      dispatch({ type: 'KEY_HIT', key: event.key })
    } else {
      dispatch({ type: 'KEY_MISS', key: event.key })
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  // Sound effects
  useEffect(() => {
    if (state.phase === 'playing') {
      playDram()
      cracker()
    }
  }, [state.correctKeys])

  useEffect(() => {
    if (state.phase === 'playing') {
      playBeep()
    }
  }, [state.missCnt])

  // New word speech
  useEffect(() => {
    if (state.phase === 'playing' && state.target.word) {
      speech(state.target.word)
    }
  }, [state.target.word])

  // Word cleared animation
  useEffect(() => {
    if (!state.wordCleared) return
    cracker(true)
    const timer = setTimeout(() => {
      dispatch({ type: 'WORD_CLEARED_DONE' })
    }, 800)
    return () => clearTimeout(timer)
  }, [state.wordCleared])

  // Shake animation
  useEffect(() => {
    if (!state.shakeKey) return
    const timer = setTimeout(() => {
      dispatch({ type: 'SHAKE_DONE' })
    }, 400)
    return () => clearTimeout(timer)
  }, [state.shakeKey])

  // Countdown timer
  useEffect(() => {
    if (state.phase !== 'countdown' || state.countdown === null) return

    if (state.countdown === 0) {
      const words = state.imageData
      const shuffled = words.sort(() => Math.random() - 0.5)
      dispatch({ type: 'START', words: shuffled })
      return
    }

    const timer = setTimeout(() => {
      dispatch({ type: 'COUNTDOWN_TICK', value: state.countdown! - 1 })
    }, 600)
    return () => clearTimeout(timer)
  }, [state.countdown, state.phase])

  // Completion - save score
  useEffect(() => {
    if (state.phase !== 'completed') return

    celebrateCompletion()

    if (lessonId) {
      const accuracy =
        state.totalKeys > 0 ? Math.round((state.correctKeys / state.totalKeys) * 100) : 100

      addScore(lessonId, {
        accuracy,
        maxCombo: state.maxCombo,
        misses: state.missCnt,
        totalWords: state.completedWords,
      })
    }
  }, [state.phase, lessonId])

  return {
    state,
    canvasRef,
    startCountdown,
    retry,
  }
}
