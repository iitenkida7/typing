import { useState, useEffect } from 'react'

interface LessonWord {
  word: string
  ja: string
}

interface FlickrPhoto {
  id: string
  url_s: string
}

const CORNERS = [
  'top-0 left-0',
  'top-0 right-0',
  'bottom-0 left-0',
  'bottom-0 right-0',
]

export default function Images({ word, imageData }: { word: string; imageData: LessonWord[] }) {
  const [photos, setPhotos] = useState<Record<string, FlickrPhoto[]>>({})

  useEffect(() => {
    imageData.forEach((item) => {
      getImage(item.word)
    })
  }, [])

  const getImage = async (text: string) => {
    try {
      const response = await fetch(`/api/images?text=${encodeURIComponent(text)}`)
      if (!response.ok) return
      const fetched: FlickrPhoto[] = await response.json()
      fetched.forEach((photo) => {
        if (photo.url_s) {
          const img = new Image()
          img.src = photo.url_s
        }
      })
      setPhotos((prev) => ({ ...prev, [text]: fetched }))
    } catch {
      // ignore
    }
  }

  const wordPhotos = photos[word] ?? []

  return (
    <>
      {wordPhotos.map((photo, i) => (
        <div
          key={`${word}-${i}`}
          className={`absolute ${CORNERS[i]} z-0 w-[18vmin] h-[18vmin] m-1 overflow-hidden rounded-xl shadow-lg opacity-80 transition-all duration-300`}
        >
          <img
            src={photo.url_s}
            alt={word}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </>
  )
}
