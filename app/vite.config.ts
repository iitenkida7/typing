import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'

// Load FLICKR_API_KEY from .dev.vars for local development
function loadDevVars(): Record<string, string> {
  try {
    const content = fs.readFileSync('.dev.vars', 'utf-8')
    const vars: Record<string, string> = {}
    for (const line of content.split('\n')) {
      const [key, ...rest] = line.split('=')
      if (key && rest.length > 0) {
        vars[key.trim()] = rest.join('=').trim()
      }
    }
    return vars
  } catch {
    return {}
  }
}

export default defineConfig(({ command }) => {
  const devVars = command === 'serve' ? loadDevVars() : {}
  const flickrApiKey = devVars.FLICKR_API_KEY ?? ''

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Local dev: mimic the Hono /api/images endpoint
      ...(command === 'serve'
        ? [
            {
              name: 'flickr-api-proxy',
              configureServer(server: { middlewares: { use: (fn: (req: { url?: string }, res: { setHeader: (k: string, v: string) => void; end: (body: string) => void; statusCode: number }, next: () => void) => void) => void } }) {
                server.middlewares.use((req, res, next) => {
                  if (!req.url?.startsWith('/api/images')) return next()
                  const url = new URL(req.url, 'http://localhost')
                  const text = url.searchParams.get('text')
                  if (!text) {
                    res.statusCode = 400
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify({ error: 'text parameter is required' }))
                    return
                  }
                  const params = new URLSearchParams({
                    method: 'flickr.photos.search',
                    api_key: flickrApiKey,
                    per_page: '4',
                    extras: 'url_s',
                    sort: 'relevance',
                    media: 'photos',
                    safe_search: '1',
                    format: 'json',
                    nojsoncallback: '1',
                    text,
                  })
                  fetch(`https://api.flickr.com/services/rest/?${params}`)
                    .then((r) => r.json() as Promise<{ photos: { photo: { id: string; url_s: string }[] } }>)
                    .then((data) => {
                      res.setHeader('Content-Type', 'application/json')
                      res.end(JSON.stringify(data.photos.photo))
                    })
                    .catch(() => {
                      res.statusCode = 502
                      res.setHeader('Content-Type', 'application/json')
                      res.end(JSON.stringify({ error: 'Failed to fetch from Flickr' }))
                    })
                })
              },
            },
          ]
        : []),
    ],
  }
})
