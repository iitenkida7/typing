/// <reference types="@cloudflare/workers-types" />
import { Hono } from 'hono'

type Env = {
  ASSETS: Fetcher
}

const app = new Hono<{ Bindings: Env }>()

// Future API routes can be added here
// app.get('/api/...', ...)

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
