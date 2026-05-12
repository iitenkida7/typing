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

export default function Lesson() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const currentIndex = LESSON_KEYS.indexOf(id ?? '')
  const nextLessonId = LESSON_KEYS[currentIndex + 1] ?? null

  const [isStarted, setIsStarted] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [target, setTarget] = useState<LessonWord>({ word: '', ja: '' })
  const [remains, setRemains] = useState('')
  const [targetChr, setTargetChr] = useState('')
  const [missCnt, setMissCnt] = useState(0)
  const [pressKey, setPressKey] = useState('')
  const [keyCode, setKeyCode] = useState(0)
  const [imageData, setImageData] = useState<LessonWord[]>([])
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [totalKeys, setTotalKeys] = useState(0)
  const [correctKeys, setCorrectKeys] = useState(0)
  const [wordCleared, setWordCleared] = useState(false)
  const [totalWords, setTotalWords] = useState(0)
  const [completedWords, setCompletedWords] = useState(0)
  const [lastPressedKey, setLastPressedKey] = useState('')
  const [shakeKey, setShakeKey] = useState(false)

  // Refs to access latest state inside keyPress handler
  const remainsRef = useRef('')
  const targetChrRef = useRef('')
  const typingDataRef = useRef<LessonWord[]>([])
  const isStartedRef = useRef(false)
  const isCompletedRef = useRef(false)
  const comboRef = useRef(0)
  const maxComboRef = useRef(0)
  const totalKeysRef = useRef(0)
  const correctKeysRef = useRef(0)
  const completedWordsRef = useRef(0)

  // Preload voices
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
    setCountdown(null)
    setTarget({ word: '', ja: '' })
    setRemains('')
    setTargetChr('')
    setMissCnt(0)
    setPressKey('')
    setKeyCode(0)
    setCombo(0)
    setMaxCombo(0)
    setTotalKeys(0)
    setCorrectKeys(0)
    setWordCleared(false)
    setTotalWords(0)
    setCompletedWords(0)
    setLastPressedKey('')
    setShakeKey(false)
    typingDataRef.current = []
    isStartedRef.current = false
    isCompletedRef.current = false
    remainsRef.current = ''
    targetChrRef.current = ''
    comboRef.current = 0
    maxComboRef.current = 0
    totalKeysRef.current = 0
    correctKeysRef.current = 0
    completedWordsRef.current = 0
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

  const startCountdown = () => {
    if (!id) return
    const lesson = (lessonData as LessonDataType)[id as keyof LessonDataType]
    if (!lesson) return

    setCountdown(3)
    let count = 3
    const timer = setInterval(() => {
      count--
      if (count > 0) {
        setCountdown(count)
      } else {
        clearInterval(timer)
        setCountdown(null)
        actualStart()
      }
    }, 600)
  }

  const actualStart = () => {
    if (!id) return
    const lesson = (lessonData as LessonDataType)[id as keyof LessonDataType]
    if (!lesson) return

    const words: LessonWord[] = JSON.parse(JSON.stringify(lesson.words))
    const shuffled = words.sort(() => Math.random() - 0.5)

    typingDataRef.current = shuffled
    isStartedRef.current = true
    isCompletedRef.current = false
    comboRef.current = 0
    maxComboRef.current = 0
    totalKeysRef.current = 0
    correctKeysRef.current = 0
    completedWordsRef.current = 0

    setIsStarted(true)
    setIsCompleted(false)
    setMissCnt(0)
    setPressKey('')
    setKeyCode(0)
    setCombo(0)
    setMaxCombo(0)
    setTotalKeys(0)
    setCorrectKeys(0)
    setCompletedWords(0)
    setTotalWords(shuffled.length)

    const { next } = loadNextWord(shuffled)
    speech(next.word)
  }

  const retry = () => {
    if (!id) return
    const lesson = (lessonData as LessonDataType)[id as keyof LessonDataType]
    if (!lesson) return
    setImageData(JSON.parse(JSON.stringify(lesson.words)))
    startCountdown()
  }

  const keyPress = useCallback((event: KeyboardEvent) => {
    if (!isStartedRef.current || isCompletedRef.current) return

    const currentChr = targetChrRef.current
    const currentRemains = remainsRef.current
    const currentTypingData = typingDataRef.current

    totalKeysRef.current++
    setTotalKeys(totalKeysRef.current)

    if (currentChr.toLowerCase() === event.key.toLowerCase()) {
      correctKeysRef.current++
      setCorrectKeys(correctKeysRef.current)

      comboRef.current++
      if (comboRef.current > maxComboRef.current) {
        maxComboRef.current = comboRef.current
      }
      setCombo(comboRef.current)
      setMaxCombo(maxComboRef.current)

      const newRemains = currentRemains.substring(1)
      const newTargetChr = newRemains.charAt(0)

      remainsRef.current = newRemains
      targetChrRef.current = newTargetChr
      setRemains(newRemains)
      setTargetChr(newTargetChr)
      setLastPressedKey(event.key.toUpperCase())
      setShakeKey(false)

      cracker()
      playDram()

      if (newRemains.length === 0) {
        completedWordsRef.current++
        setCompletedWords(completedWordsRef.current)

        // Word cleared animation
        setWordCleared(true)
        cracker(true)
        setTimeout(() => setWordCleared(false), 800)

        if (currentTypingData.length > 0) {
          const { next } = loadNextWord(currentTypingData)
          speech(next.word)
        } else {
          isCompletedRef.current = true
          setIsCompleted(true)
          celebrateCompletion()
        }
      }
    } else {
      comboRef.current = 0
      setCombo(0)
      setMissCnt((prev) => prev + 1)
      setLastPressedKey(event.key.toUpperCase())
      setShakeKey(true)
      setTimeout(() => setShakeKey(false), 400)
      playBeep()
    }

    setPressKey(event.key)
    setKeyCode(event.keyCode)
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', keyPress)
    return () => document.removeEventListener('keydown', keyPress)
  }, [keyPress])

  const accuracy = totalKeys > 0 ? Math.round((correctKeys / totalKeys) * 100) : 100
  const comboInfo = getComboMessage(combo)

  const lessonObj = id
    ? (lessonData as LessonDataType)[id as keyof LessonDataType]
    : null

  return (
    <div>
      <p className="text-sm text-gray-400 mb-2">
        {lessonObj ? lessonObj.description : id}
      </p>

      {/* Countdown overlay */}
      {countdown !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <span className="text-9xl font-bold text-white animate-ping">
            {countdown}
          </span>
        </div>
      )}

      {isStarted && !isCompleted && (
        <div>
          {/* Progress bar */}
          <div className="mb-3">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>{completedWords} / {totalWords} ワード</span>
              <span>せいかくさ {accuracy}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${totalWords > 0 ? (completedWords / totalWords) * 100 : 0}%` }}
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

          {/* 2-column layout: left=images, right=typing */}
          <div className="flex gap-4 items-start">
            {/* Left: images + word info */}
            <div className="w-64 shrink-0">
              <div className={wordCleared ? 'animate-[wordClear_0.6s_ease-out]' : ''}>
                <Word ja={target.ja} word={target.word} />
              </div>
              <div className="mt-2">
                <Images imageData={imageData} word={target.word} />
              </div>
              <div className="text-center mt-3">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 text-sm rounded-lg shadow-md hover:shadow-lg transition-all"
                  onClick={() => speech(target.word)}
                >
                  もういちど きく
                </button>
              </div>
            </div>

            {/* Right: char display + keyboard */}
            <div className="flex-1 min-w-0">
              <div className="text-center">
                <canvas ref={canvasRef} />
              </div>
              <Char word={target.word} remains={remains} />
              <Keyboard
                targetChr={targetChr.toUpperCase()}
                lastPressedKey={lastPressedKey}
                shakeKey={shakeKey}
              />
            </div>
          </div>
        </div>
      )}

      {!isStarted && countdown === null && (
        <div className="text-center mt-16">
          <div className="mb-8">
            <p className="text-xl text-gray-600 mb-2">
              {lessonObj ? `「${lessonObj.description}」` : ''}
            </p>
            <p className="text-gray-400">
              {lessonObj ? `${lessonObj.words.length} ワード` : ''}
            </p>
          </div>
          <button
            onClick={startCountdown}
            className="bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-3xl px-16 py-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 animate-bounce"
          >
            スタート！
          </button>
        </div>
      )}

      {isCompleted && (
        <div className="text-center mt-8">
          <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />
          <div className="animate-[fadeInUp_0.5s_ease-out]">
            <p className="text-5xl font-bold mb-4 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              クリア！
            </p>
            <p className="text-6xl mb-6">&#x1F389;</p>

            {/* Score card */}
            <div className="inline-block bg-white rounded-2xl shadow-xl p-6 mb-8 text-left">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">せいかくさ</p>
                  <p className="text-3xl font-bold text-blue-500">{accuracy}%</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">さいだいコンボ</p>
                  <p className="text-3xl font-bold text-orange-500">{maxCombo}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">ワードすう</p>
                  <p className="text-3xl font-bold text-green-500">{totalWords}</p>
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
                <p className="text-center mt-4 text-blue-500 font-bold text-lg">
                  とってもじょうず！
                </p>
              )}
              {accuracy >= 70 && accuracy < 90 && (
                <p className="text-center mt-4 text-green-500 font-bold text-lg">
                  よくがんばったね！
                </p>
              )}
              {accuracy < 70 && (
                <p className="text-center mt-4 text-purple-500 font-bold text-lg">
                  もういちどチャレンジしよう！
                </p>
              )}
            </div>

            <div className="flex justify-center gap-4">
              <button
                className="bg-linear-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white text-xl px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                onClick={retry}
              >
                もういちど
              </button>
              {nextLessonId && (
                <button
                  className="bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white text-xl px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  onClick={() => navigate(`/lesson/${nextLessonId}`)}
                >
                  つぎのレッスン
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Debug pressKey={pressKey} keyCode={keyCode} missCnt={missCnt} />
    </div>
  )
}
