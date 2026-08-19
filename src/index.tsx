import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import notesEndpoints from './features/notes/notesEndpoints';
import authEndpoints, { authMiddleware } from './features/auth/authEndpoints';
import chatEndpoints from './features/chat/chatEndpoints';
import Home from './features/shared/components/pages/Home';

const app = new Hono()

app.use(logger());

app.use('/static/*', serveStatic({ root: `./` }));

// Auth routes (public)
app.route('/', authEndpoints);

// Protected routes
app.use('/', authMiddleware());
app.use('/notes/*', authMiddleware());
app.use('/chat/*', authMiddleware());
app.use('/refresh', authMiddleware());

app.get('/', (c) => {
  return c.html(<Home/>)
})
app.route('/', notesEndpoints);
app.route('/', chatEndpoints);

const port = Number(process.env.PORT) || 3000;

console.log("Starting server on port", port);

Bun.serve({
    port,
    fetch: app.fetch,
});
