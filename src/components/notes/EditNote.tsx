import RatingStars from "./RatingStars";
import { Note } from "../../models";
import { tagsToSpaces } from "../helpers";
import { v4 as uuidv4 } from 'uuid';
import { getNoteByIdAsync } from "../../services/NotesService";
import RatingSelector from "./RatingSelector";

interface EditNoteProps {
    noteId: string | null;
}

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
    if (noteId){
        note = await getNoteByIdAsync(noteId!)
    }
    
    return (
        <>
            <form id="editNote" hx-post={`/editnote/${note?.Id}`} hx-encoding='multipart/form-data' hx-indicator="#indicator">
                <input type="hidden" name="Id" value={note?.Id} />
                <div className="m-3 text-center note-image-wrapper">
                    <img className="" src={note?.StorageUrl?.trim() ? note.StorageUrl : '/static/img/missing.jpg'} alt={note?.Title}/>
                </div>
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" name="Title" value={note?.Title} required maxlength={200} />
                </div>
                <div class="mb-3">
                    <label for="rating" class="form-label">Rating</label>
                    <RatingSelector Rating={note?.Rating!} />
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea class="form-control" id="description" rows={3} maxlength={2000} name="Description">{note?.Description}</textarea>
                </div>
                <div class="mb-3">
                    <label for="file" class="form-label">Attach File</label>
                    <input type="file" class="form-control w-100" id="file" name="File" accept=".jpg,.jpeg,.png,.webp" value={note?.FileName}/>  
                </div>
                <div class="mb-3">
                    <label for="tags" class="form-label">Tags</label>
                    <input type="text" class="form-control" id="tags" name="Tags" maxlength={200} value={tagsToSpaces(note?.Tags!)} autocomplete="on" required />
                </div>
            </form>
            <div class="d-flex justify-content-evenly gap-1 w-100">
                <button type="submit" form="editNote" class="btn btn-primary w-25">Save</button>
                <button type="button" class="btn btn-secondary w-25" hx-get={`/notedetails/${note?.Id}`} hx-confirm="Are you sure you wish to cancel?">Cancel</button>
            </div>        
        </>
    )
}

export default EditNote;