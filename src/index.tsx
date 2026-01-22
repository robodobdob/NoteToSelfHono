import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';
import { logger } from 'hono/logger';
import notesEndpoints from './features/notes/notesEndpoints';
import Home from './features/shared/components/pages/Home';

const app = new Hono()

app.use(logger());

app.use('/static/*', serveStatic({ root: `./` }));

app.get('/', (c) => {
  return c.html(<Home/>)
})
app.route('/', notesEndpoints);

const port = Number(process.env.PORT) || 3000;

console.log("Starting server on port", port);

Bun.serve({
    port,
    fetch: app.fetch,
});