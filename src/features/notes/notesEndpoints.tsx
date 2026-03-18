import { Hono } from 'hono'
import NoteList from './components/NoteList'
import NoteDetails from './components/NoteDetails'
import EditNote from './components/EditNote'
import { Note, toNote } from '../../models'
import { removeNoteAsync, saveNoteAsync } from './notesService'
import Refresh from './components/Refresh'
import RatingSelector from './components/RatingSelector'

const app = new Hono()

app.get('/notes/list', async (c) => {
  const query = c.req.query('Query')
  const tags = c.req.queries('Tags')
  return c.html(
      <NoteList query={query} tags={tags} hxTriggerName={c.req.header('HX-Trigger-Name')} />
  )
})

app.get('/notes/details/:id', async (c) => {
  const { id } = c.req.param();
  return c.html(
      <NoteDetails id={id} />
  )
})

app.get('/notes/edit/:id', async (c) => {
  const { id } = c.req.param()
  return c.html(
    <EditNote noteId={id} />
  )
})

app.post('/notes/edit/:id', async (c) => {
  const body = await c.req.parseBody()
  const note: Note = toNote(body);
  await saveNoteAsync(note, note.File as Blob);
  c.res.headers.append('HX-Trigger', 'notes-updated, close-modal');
  c.status(200);
  return c.text('');
})

app.delete('/notes/delete/:id', async (c) => {
  const { id } = c.req.param()
  await removeNoteAsync(id)
  c.res.headers.append('HX-Trigger', 'notes-updated, close-modal');
  c.status(200);
  return c.text('');
})

app.get('/notes/rating/:rating', (c) => {
  const rating: number = Number(c.req.param('rating'))
  return c.html(
      <RatingSelector rating={rating}/>
  )
})

app.get('/refresh', (c) => {
  return c.html(<Refresh />)
})

export default app