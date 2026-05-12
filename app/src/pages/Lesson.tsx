import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import lessonData from '../data/lesson.json'
import Word from '../components/Word'
import Images from '../components/Images'
import Char from '../components/Char'
import Keyboard from '../components/Keyboard'
import Debug from '../components/Debug'

interface LessonWord {
  word: string
  ja: string
}

type LessonDataType = typeof lessonData

const LESSON_KEYS = Object.keys(lessonData)

export default function Lesson() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const currentIndex = LESSON_KEYS.indexOf(id ?? '')
  const nextLessonId = LESSON_KEYS[currentIndex + 1] ?? null

  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [target, setTarget] = useState<LessonWord>({ word: '', ja: '' })
  const [remains, setRemains] = useState('')
  const [targetChr, setTargetChr] = useState('')
  const [missCnt, setMissCnt] = useState(0)
  const [pressKey, setPressKey] = useState('')
  const [keyCode, setKeyCode] = useState(0)
  const [imageData, setImageData] = useState<LessonWord[]>([])

  // Refs to access latest state inside keyPress handler
  const remainsRef = useRef('')
  const targetChrRef = useRef('')
  const typingDataRef = useRef<LessonWord[]>([])
  const isStartedRef = useRef(false)
  const isCompletedRef = useRef(false)

  // Preload voices (async in most browsers)
  useEffect(() => {
    const load = () => window.speechSynthesis.getVoices()
    load()
    window.speechSynthesis.onvoiceschanged = load
    return () => {
      window.speechSynthesis.onvoiceschanged = null
    }
  }, [])

  // Reset when lesson id changes
  useEffect(() => {
    if (!id) return
    const lesson = (lessonData as LessonDataType)[id as keyof LessonDataType]
    if (!lesson) return

    const words: LessonWord[] = JSON.parse(JSON.stringify(lesson.words))
    setImageData(words)

    setIsStarted(false)
    setIsCompleted(false)
    setTarget({ word: '', ja: '' })
    setRemains('')
    setTargetChr('')
    setMissCnt(0)
    setPressKey('')
    setKeyCode(0)
    typingDataRef.current = []
    isStartedRef.current = false
    isCompletedRef.current = false
    remainsRef.current = ''
    targetChrRef.current = ''
  }, [id])

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

  const cracker = () => {
    if (!canvasRef.current) return
    confetti.create(canvasRef.current, { resize: true })({
      shapes: ['square'],
      particleCount: 20,
      spread: 120,
      origin: { y: 1, x: 0.5 },
    })
  }

  const playDram = () => new Audio('/sounds/dram.mp3').play()
  const playBeep = () => new Audio('/sounds/beep.mp3').play()

  const loadNextWord = (data: LessonWord[]) => {
    const [next, ...rest] = data
    typingDataRef.current = rest
    remainsRef.current = next.word
    targetChrRef.current = next.word.charAt(0)
    setTarget(next)
    setRemains(next.word)
    setTargetChr(next.word.charAt(0))
    return { next, rest }
  }

  const start = () => {
    if (!id) return
    const lesson = (lessonData as LessonDataType)[id as keyof LessonDataType]
    if (!lesson) return

    const words: LessonWord[] = JSON.parse(JSON.stringify(lesson.words))
    const shuffled = words.sort(() => Math.random() - 0.5)

    typingDataRef.current = shuffled
    isStartedRef.current = true
    isCompletedRef.current = false

    setTypingDataAndStart(shuffled)
  }

  const setTypingDataAndStart = (shuffled: LessonWord[]) => {
    setIsStarted(true)
    setIsCompleted(false)
    setMissCnt(0)
    setPressKey('')
    setKeyCode(0)

    const { next } = loadNextWord(shuffled)
    speech(next.word)
  }

  const retry = () => {
    if (!id) return
    const lesson = (lessonData as LessonDataType)[id as keyof LessonDataType]
    if (!lesson) return
    setImageData(JSON.parse(JSON.stringify(lesson.words)))
    start()
  }

  const keyPress = useCallback((event: KeyboardEvent) => {
    if (!isStartedRef.current || isCompletedRef.current) return

    const currentChr = targetChrRef.current
    const currentRemains = remainsRef.current
    const currentTypingData = typingDataRef.current

    if (currentChr.toLowerCase() === event.key.toLowerCase()) {
      const newRemains = currentRemains.substring(1)
      const newTargetChr = newRemains.charAt(0)

      remainsRef.current = newRemains
      targetChrRef.current = newTargetChr
      setRemains(newRemains)
      setTargetChr(newTargetChr)

      cracker()
      playDram()

      if (newRemains.length === 0) {
        if (currentTypingData.length > 0) {
          const { next } = loadNextWord(currentTypingData)
          speech(next.word)
        } else {
          isCompletedRef.current = true
          setIsCompleted(true)
        }
      }
    } else {
      setMissCnt((prev) => prev + 1)
      playBeep()
    }

    setPressKey(event.key)
    setKeyCode(event.keyCode)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  return (
    <div>
      <p className="text-sm text-gray-400 mb-2">{id}</p>

      {isStarted && !isCompleted && (
        <div>
          <Word ja={target.ja} word={target.word} />
          <Images imageData={imageData} word={target.word} />
          <div className="text-center">
            <canvas ref={canvasRef} />
          </div>
          <Char remains={remains} />
          <Keyboard targetChr={targetChr.toUpperCase()} />
          <div className="text-center mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
              onClick={() => speech(target.word)}
            >
              再生
            </button>
          </div>
        </div>
      )}

      {!isStarted && (
        <div className="text-center mt-16">
          <button
            onClick={start}
            className="bg-blue-500 hover:bg-blue-600 text-white text-2xl px-12 py-4 rounded-lg"
          >
            Start
          </button>
        </div>
      )}

      {isCompleted && (
        <div className="text-center mt-16">
          <p className="text-blue-500 text-3xl mb-8">Completed! ＼(^o^)／</p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white text-xl px-10 py-4 rounded-lg"
              onClick={retry}
            >
              Retry
            </button>
            {nextLessonId && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white text-xl px-10 py-4 rounded-lg"
                onClick={() => navigate(`/lesson/${nextLessonId}`)}
              >
                次のレッスン →
              </button>
            )}
          </div>
        </div>
      )}

      <Debug pressKey={pressKey} keyCode={keyCode} missCnt={missCnt} />
    </div>
  )
}
