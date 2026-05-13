import { describe, it, expect, beforeEach } from 'vitest'
import { lessonReducer, type LessonState, type LessonWord } from './useLessonReducer'

const mockWords: LessonWord[] = [
  { word: 'apple', ja: 'りんご' },
  { word: 'banana', ja: 'バナナ' },
  { word: 'cat', ja: 'ねこ' },
]

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

describe('lessonReducer', () => {
  describe('INIT', () => {
    it('resets to idle phase and sets imageData', () => {
      const state = lessonReducer(initialState, { type: 'INIT', words: mockWords })

      expect(state.phase).toBe('idle')
      expect(state.imageData).toEqual(mockWords)
      expect(state.countdown).toBeNull()
    })
  })

  describe('COUNTDOWN_START', () => {
    it('sets phase to countdown and initializes countdown to 3', () => {
      const state = lessonReducer(initialState, {
        type: 'COUNTDOWN_START',
        words: mockWords,
      })

      expect(state.phase).toBe('countdown')
      expect(state.countdown).toBe(3)
    })
  })

  describe('COUNTDOWN_TICK', () => {
    it('decrements countdown', () => {
      let state = lessonReducer(initialState, { type: 'COUNTDOWN_START', words: mockWords })
      state = lessonReducer(state, { type: 'COUNTDOWN_TICK', value: 2 })

      expect(state.countdown).toBe(2)
    })
  })

  describe('START', () => {
    it('sets phase to playing and loads first word', () => {
      const state = lessonReducer(initialState, { type: 'START', words: mockWords })

      expect(state.phase).toBe('playing')
      expect(state.target.word).toBe('apple')
      expect(state.remains).toBe('apple')
      expect(state.targetChr).toBe('a')
      expect(state.typingQueue).toHaveLength(2)
      expect(state.typingQueue[0].word).toBe('banana')
      expect(state.totalWords).toBe(3)
      expect(state.correctKeys).toBe(0)
      expect(state.combo).toBe(0)
    })
  })

  describe('KEY_HIT', () => {
    let playingState: LessonState

    beforeEach(() => {
      playingState = lessonReducer(initialState, { type: 'START', words: mockWords })
    })

    it('increments correctKeys and combo on correct key', () => {
      const state = lessonReducer(playingState, { type: 'KEY_HIT', key: 'a' })

      expect(state.correctKeys).toBe(1)
      expect(state.totalKeys).toBe(1)
      expect(state.combo).toBe(1)
      expect(state.maxCombo).toBe(1)
      expect(state.remains).toBe('pple')
      expect(state.targetChr).toBe('p')
      expect(state.shakeKey).toBe(false)
      expect(state.lastPressedKey).toBe('A')
    })

    it('completes word and loads next when remains becomes empty', () => {
      let state = playingState
      // Type 'apple' letter by letter
      state = lessonReducer(state, { type: 'KEY_HIT', key: 'a' })
      state = lessonReducer(state, { type: 'KEY_HIT', key: 'p' })
      state = lessonReducer(state, { type: 'KEY_HIT', key: 'p' })
      state = lessonReducer(state, { type: 'KEY_HIT', key: 'l' })
      state = lessonReducer(state, { type: 'KEY_HIT', key: 'e' })

      expect(state.wordCleared).toBe(true)
      expect(state.completedWords).toBe(1)
      expect(state.target.word).toBe('banana')
      expect(state.remains).toBe('banana')
      expect(state.targetChr).toBe('b')
      expect(state.typingQueue).toHaveLength(1)
      expect(state.phase).toBe('playing')
    })

    it('completes lesson when last word is finished', () => {
      let state = playingState
      // Type all 3 words
      for (const word of mockWords) {
        for (const char of word.word) {
          state = lessonReducer(state, { type: 'KEY_HIT', key: char })
          if (state.phase === 'completed') break
        }
        if (state.phase === 'completed') break
      }

      expect(state.phase).toBe('completed')
      expect(state.completedWords).toBe(3)
    })

    it('updates maxCombo when combo exceeds previous max', () => {
      let state = playingState

      // Build up combo
      state = lessonReducer(state, { type: 'KEY_HIT', key: 'a' })
      expect(state.combo).toBe(1)
      expect(state.maxCombo).toBe(1)

      state = lessonReducer(state, { type: 'KEY_HIT', key: 'p' })
      expect(state.combo).toBe(2)
      expect(state.maxCombo).toBe(2)

      // Miss breaks combo
      state = lessonReducer(state, { type: 'KEY_MISS', key: 'x' })
      expect(state.combo).toBe(0)
      expect(state.maxCombo).toBe(2) // Still 2

      // Build new combo
      state = lessonReducer(state, { type: 'KEY_HIT', key: 'p' })
      expect(state.combo).toBe(1)
      expect(state.maxCombo).toBe(2) // Still 2, not higher
    })
  })

  describe('KEY_MISS', () => {
    let playingState: LessonState

    beforeEach(() => {
      playingState = lessonReducer(initialState, { type: 'START', words: mockWords })
    })

    it('increments missCnt and resets combo', () => {
      let state = lessonReducer(playingState, { type: 'KEY_HIT', key: 'a' })
      expect(state.combo).toBe(1)

      state = lessonReducer(state, { type: 'KEY_MISS', key: 'x' })

      expect(state.totalKeys).toBe(2)
      expect(state.combo).toBe(0)
      expect(state.missCnt).toBe(1)
      expect(state.shakeKey).toBe(true)
      expect(state.lastPressedKey).toBe('X')
    })
  })

  describe('WORD_CLEARED_DONE', () => {
    it('sets wordCleared to false', () => {
      let state = lessonReducer(initialState, { type: 'START', words: mockWords })
      state = { ...state, wordCleared: true }
      state = lessonReducer(state, { type: 'WORD_CLEARED_DONE' })

      expect(state.wordCleared).toBe(false)
    })
  })

  describe('SHAKE_DONE', () => {
    it('sets shakeKey to false', () => {
      let state = lessonReducer(initialState, { type: 'START', words: mockWords })
      state = { ...state, shakeKey: true }
      state = lessonReducer(state, { type: 'SHAKE_DONE' })

      expect(state.shakeKey).toBe(false)
    })
  })

  describe('RETRY', () => {
    it('resets to idle and clears stats', () => {
      let state = lessonReducer(initialState, { type: 'START', words: mockWords })

      // Make some progress
      state = lessonReducer(state, { type: 'KEY_HIT', key: 'a' })
      state = lessonReducer(state, { type: 'KEY_HIT', key: 'p' })

      state = lessonReducer(state, { type: 'RETRY', words: mockWords })

      expect(state.phase).toBe('idle')
      expect(state.totalKeys).toBe(0)
      expect(state.correctKeys).toBe(0)
      expect(state.combo).toBe(0)
      expect(state.maxCombo).toBe(0)
      expect(state.missCnt).toBe(0)
      expect(state.completedWords).toBe(0)
      expect(state.wordCleared).toBe(false)
      expect(state.shakeKey).toBe(false)
    })
  })
})
