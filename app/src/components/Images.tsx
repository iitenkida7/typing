import { useState, useEffect } from 'react'
import axios from 'axios'

interface LessonWord {
  word: string
  ja: string
}

interface FlickrPhoto {
  id: string
  url_s: string
}

export default function Images({ word, imageData }: { word: string; imageData: LessonWord[] }) {
  const [photos, setPhotos] = useState<Record<string, FlickrPhoto[]>>({})

  useEffect(() => {
    imageData.forEach((item) => {
      getImage(item.word)
    })
  }, [])

  const getImage = async (text: string) => {
    const params = new URLSearchParams({
      method: 'flickr.photos.search',
      api_key: '2da67eccedeb0b110a63374c5c53cc41',
      per_page: '4',
      extras: 'url_s',
      sort: 'relevance',
      media: 'photos',
      safe_search: '1',
      format: 'json',
      nojsoncallback: '1',
      text,
    })
    try {
      const response = await axios.get(`https://api.flickr.com/services/rest/?${params}`)
      setPhotos((prev) => ({ ...prev, [text]: response.data.photos.photo }))
    } catch {
      // ignore
    }
  }

  return (
    <div className="grid grid-cols-4 gap-3 mt-6">
      {(photos[word] ?? []).map((photo, i) => (
        <div key={i} className="aspect-square overflow-hidden rounded-lg">
          <img src={photo.url_s} alt={word} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  )
}
