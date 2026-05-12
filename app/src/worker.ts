/// <reference types="@cloudflare/workers-types" />
import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'
import manifest from '__STATIC_CONTENT_MANIFEST'

type Env = {
  __STATIC_CONTENT: KVNamespace
}

const app = new Hono<{ Bindings: Env }>()

// Serve static files
app.get('*', serveStatic({ root: '/', manifest }))

// SPA fallback: serve index.html for client-side routing
app.get('*', serveStatic({ path: '/index.html', manifest }))

export default app
