/// <reference types="@cloudflare/workers-types" />
import { Hono } from 'hono'

type Env = {
  ASSETS: Fetcher
  FLICKR_API_KEY: string
}

const app = new Hono<{ Bindings: Env }>()

// Flickr image search proxy (keeps API key server-side)
app.get('/api/images', async (c) => {
  const text = c.req.query('text')
  if (!text) {
    return c.json({ error: 'text parameter is required' }, 400)
  }

  const params = new URLSearchParams({
    method: 'flickr.photos.search',
    api_key: c.env.FLICKR_API_KEY,
    per_page: '4',
    extras: 'url_s',
    sort: 'relevance',
    media: 'photos',
    safe_search: '1',
    format: 'json',
    nojsoncallback: '1',
    text,
  })

  const response = await fetch(`https://api.flickr.com/services/rest/?${params}`)
  const data = await response.json<{ photos: { photo: { id: string; url_s: string }[] } }>()
  return c.json(data.photos.photo)
})

// Serve static assets, fallback to index.html for SPA routing
app.get('*', async (c) => {
  const response = await c.env.ASSETS.fetch(c.req.raw)
  if (response.status === 404) {
    const indexUrl = new URL('/index.html', c.req.url)
    return c.env.ASSETS.fetch(new Request(indexUrl.toString()))
  }
  return response
})

export default app
