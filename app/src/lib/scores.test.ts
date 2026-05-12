import { describe, it, expect, beforeEach } from 'vitest'
import { addScore, getScores, getBestScore, isCleared, getAllClearStatus, clearAllScores } from './scores'

describe('scores', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('addScore', () => {
    it('adds a score and getScores returns it with ISO date', () => {
      const before = new Date()
      addScore('lesson1', { accuracy: 95, maxCombo: 20, misses: 3, totalWords: 15 })
      const after = new Date()

      const scores = getScores('lesson1')
      expect(scores).toHaveLength(1)
      expect(scores[0]).toEqual({
        accuracy: 95,
        maxCombo: 20,
        misses: 3,
        totalWords: 15,
        date: expect.any(String),
      })

      const scoreDate = new Date(scores[0].date)
      expect(scoreDate.getTime()).toBeGreaterThanOrEqual(before.getTime())
      expect(scoreDate.getTime()).toBeLessThanOrEqual(after.getTime())
    })

    it('adds multiple scores in insertion order', () => {
      addScore('lesson1', { accuracy: 85, maxCombo: 15, misses: 5, totalWords: 15 })
      addScore('lesson1', { accuracy: 95, maxCombo: 20, misses: 2, totalWords: 15 })
      addScore('lesson1', { accuracy: 100, maxCombo: 25, misses: 0, totalWords: 15 })

      const scores = getScores('lesson1')
      expect(scores).toHaveLength(3)
      expect(scores[0].accuracy).toBe(85)
      expect(scores[1].accuracy).toBe(95)
      expect(scores[2].accuracy).toBe(100)
    })
  })

  describe('getBestScore', () => {
    it('returns highest-accuracy entry', () => {
      addScore('lesson1', { accuracy: 85, maxCombo: 15, misses: 5, totalWords: 15 })
      addScore('lesson1', { accuracy: 95, maxCombo: 20, misses: 2, totalWords: 15 })
      addScore('lesson1', { accuracy: 90, maxCombo: 18, misses: 4, totalWords: 15 })

      const best = getBestScore('lesson1')
      expect(best?.accuracy).toBe(95)
    })

    it('returns highest maxCombo when accuracy is tied', () => {
      addScore('lesson1', { accuracy: 95, maxCombo: 20, misses: 2, totalWords: 15 })
      addScore('lesson1', { accuracy: 95, maxCombo: 25, misses: 2, totalWords: 15 })
      addScore('lesson1', { accuracy: 95, maxCombo: 18, misses: 3, totalWords: 15 })

      const best = getBestScore('lesson1')
      expect(best?.maxCombo).toBe(25)
    })

    it('returns null when lesson has no scores', () => {
      const best = getBestScore('lesson-empty')
      expect(best).toBeNull()
    })
  })

  describe('isCleared', () => {
    it('returns false before any score is added', () => {
      expect(isCleared('lesson1')).toBe(false)
    })

    it('returns true after a score is added', () => {
      addScore('lesson1', { accuracy: 50, maxCombo: 5, misses: 10, totalWords: 15 })
      expect(isCleared('lesson1')).toBe(true)
    })
  })

  describe('getAllClearStatus', () => {
    it('reflects multiple lessons correctly', () => {
      addScore('lesson1', { accuracy: 95, maxCombo: 20, misses: 2, totalWords: 15 })
      addScore('lesson2', { accuracy: 85, maxCombo: 15, misses: 5, totalWords: 15 })

      const status = getAllClearStatus()
      expect(status).toEqual({
        lesson1: true,
        lesson2: true,
      })
    })

    it('returns empty object when no scores exist', () => {
      const status = getAllClearStatus()
      expect(status).toEqual({})
    })
  })

  describe('clearAllScores', () => {
    it('clears all scores', () => {
      addScore('lesson1', { accuracy: 95, maxCombo: 20, misses: 2, totalWords: 15 })
      addScore('lesson2', { accuracy: 85, maxCombo: 15, misses: 5, totalWords: 15 })

      clearAllScores()

      expect(getScores('lesson1')).toEqual([])
      expect(getScores('lesson2')).toEqual([])
      expect(getAllClearStatus()).toEqual({})
    })
  })
})
