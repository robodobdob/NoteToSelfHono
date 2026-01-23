import { Hono } from 'hono'
import NoteList from './components/NoteList'
import NoteDetails from './components/NoteDetails'
import EditNote from './components/EditNote'
import { Note, toNote } from '../../models'
import { deleteNoteAsync, saveNoteAsync } from '../../services/NotesService'
import Reset from './components/Reset'
import RatingSelector from './components/RatingSelector'

const app = new Hono()

app.get('/notelist', async (c) => {
  const query = c.req.query('Query')
  const tags = c.req.queries('Tags')
  return c.html(
      <NoteList query={query} tags={tags} />
  )
})

app.get('/notedetails/:id', async (c) => {
  const { id } = c.req.param();
  return c.html(
      <NoteDetails id={id} />
  )
})

app.get('/editnote', (c) => {
  return c.html(
    <EditNote noteId={null}  />
  )
})

app.get('/editnote/:id', async (c) => {
  const { id } = c.req.param()
  return c.html(
    <EditNote noteId={id}  />
  )
})

app.post('/editnote/:id', async (c) => {
  const body = await c.req.parseBody()
  const note: Note = toNote(body);
  await saveNoteAsync(note, body["File"] as Blob);
  c.res.headers.append('HX-Trigger', 'notes-updated, close-modal');
  c.status(200);
  return c.text('');
})

app.delete('/deletenote/:id', async (c) => {
  const { id } = c.req.param()
  await deleteNoteAsync(id)
  c.res.headers.append('HX-Trigger', 'notes-updated, close-modal');
  c.status(200);
  return c.text('');
})

app.get('/ratingselector/:rating', (c) => {
  const rating: number = Number(c.req.param('rating'))
  return c.html(
      <RatingSelector rating={rating}/>
  )
})

app.get('/reset', (c) => {
  const { search, tags, list } = c.req.query();
  return c.html(
    <Reset search={search === 'true'} tags={tags === 'true'} list={list === 'true'} />
  )
})

export default app