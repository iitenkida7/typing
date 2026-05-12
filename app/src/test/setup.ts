import '@testing-library/jest-dom'
import { beforeEach } from 'vitest'

// Setup localStorage mock
const localStorageMock = {
  data: {} as Record<string, string>,
  getItem(key: string) {
    return this.data[key] ?? null
  },
  setItem(key: string, value: string) {
    this.data[key] = value
  },
  removeItem(key: string) {
    delete this.data[key]
  },
  clear() {
    this.data = {}
  },
  key(index: number) {
    const keys = Object.keys(this.data)
    return keys[index] ?? null
  },
  get length() {
    return Object.keys(this.data).length
  },
}

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
})
