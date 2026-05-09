import { Hono } from 'hono'
import NoteList from './components/NoteList'
import NoteDetails from './components/NoteDetails'
import EditNote from './components/EditNote'
import { Note, toNote } from '../../models'
import { removeNoteAsync, saveNoteAsync } from './notesService'
import Refresh from './components/Refresh'
import RatingSelector from './components/RatingSelector'

const notesEndpoints = new Hono()

const GUID_EMPTY = "00000000-0000-0000-0000-000000000000";

notesEndpoints.get('/notes/list', async (c) => {
  const query = c.req.query('Query')
  const tags = c.req.queries('Tags')
  return c.html(
      <NoteList query={query} tags={tags} hxTriggerName={c.req.header('HX-Source')} />
  )
})

notesEndpoints.get('/notes/details/:id', async (c) => {
  const { id } = c.req.param();

  if (id === GUID_EMPTY) {
    c.res.headers.append('HX-Trigger', 'notes-updated, close-modal');
    c.status(200);
    return c.text('');
  }

  return c.html(
      <NoteDetails id={id} />
  )
})

notesEndpoints.get('/notes/edit/:id', async (c) => {
  const { id } = c.req.param()
  return c.html(
    <EditNote noteId={id} />
  )
})

notesEndpoints.post('/notes/edit/:id', async (c) => {
  const body = await c.req.parseBody()
  const note: Note = toNote(body);
  await saveNoteAsync(note, note.File as Blob);
  c.res.headers.append('HX-Trigger', 'notes-updated, close-modal');
  c.status(200);
  return c.text('');
})

notesEndpoints.delete('/notes/delete/:id', async (c) => {
  const { id } = c.req.param()
  await removeNoteAsync(id)
  c.res.headers.append('HX-Trigger', 'notes-updated, close-modal');
  c.status(200);
  return c.text('');
})

notesEndpoints.get('/notes/rating/:rating', (c) => {
  const rating: number = Number(c.req.param('rating'))
  return c.html(
      <RatingSelector rating={rating}/>
  )
})

notesEndpoints.get('/refresh', (c) => {
  return c.html(<Refresh />)
})

export default notesEndpoints