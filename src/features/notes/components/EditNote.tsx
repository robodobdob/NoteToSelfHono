import { Note } from "../../../models";
import { tagsToSpaces } from "../../shared/helpers";
import { v4 as uuidv4 } from 'uuid';
import { getNoteByIdAsync } from "../NotesService";
import RatingSelector from "./RatingSelector";

interface EditNoteProps {
    noteId: string | null;
}

const GUID_EMPTY = "00000000-0000-0000-0000-000000000000";

async function EditNote(props: EditNoteProps)  {
    const { noteId } = props
    let note: Note | null = {
        Id: uuidv4(),
        Title: "",
        Description: "",
        Tags: "",
        Rating: 3,
        StorageUrl: "",
        FileName: ""
    }
    if (noteId != GUID_EMPTY){
        note = await getNoteByIdAsync(noteId!)
    }
    
    return (
        <article class="columns">
            <section>
                <div class="p-3 shadow-sm text-center note-image-wrapper">
                    <img class="" src={note?.StorageUrl?.trim() ? note.StorageUrl : '/static/img/missing.jpg'} alt={note?.Title}/>
                </div>
            </section>
            <section class="d-flex flex-column justify-content-between">
                <form id="editNote" hx-post={`/editnote/${note?.Id}`} hx-encoding='multipart/form-data'
                      hx-indicator="#indicator">
                    <input type="hidden" name="Id" value={note?.Id}/>
                    <div class="mb-3">
                        <label htmlFor="title" class="form-label">Title</label>
                        <input type="text" class="form-control shadow-sm" id="title" name="Title" value={note?.Title} required
                               maxLength={200}/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="rating" class="form-label">Rating</label>
                        <RatingSelector rating={note?.Rating!}/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="description" class="form-label">Description</label>
                        <textarea class="form-control shadow-sm" id="description" rows={3} maxLength={2000}
                                  name="Description">{note?.Description}</textarea>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="file" class="form-label">Attach File</label>
                        <input type="file" class="form-control shadow-sm w-100" id="file" name="File"
                               accept=".jpg,.jpeg,.png,.webp" value={note?.FileName}/>
                    </div>
                    <div class="mb-3">
                        <label htmlFor="tags" class="form-label">Tags</label>
                        <input type="text" class="form-control shadow-sm" id="tags" name="Tags" maxLength={200}
                               value={tagsToSpaces(note?.Tags!)} autoComplete="on" required/>
                    </div>
                </form>
                <div class="d-flex justify-content-evenly gap-1 w-100">
                    <button type="submit" form="editNote" class="btn btn-primary shadow-sm w-25">Save</button>
                    <button type="button" class="btn btn-secondary shadow-sm w-25" hx-get={`/notedetails/${note?.Id}`}
                            hx-confirm="Are you sure you wish to cancel?">Cancel
                    </button>
                </div>
            </section>

        </article>
    )
}

export default EditNote;