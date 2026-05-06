import { Note } from "../../../models";
import { getNoteByIdAsync } from "../notesService";
import RatingSelector from "./RatingSelector";
import CardPhoto from "./CardPhoto";

interface EditNoteProps {
    noteId: string | null;
}

const GUID_EMPTY = "00000000-0000-0000-0000-000000000000";

export default async function EditNote(props: EditNoteProps)  {
    const { noteId } = props
    let note: Note | null = {
        Id: GUID_EMPTY,
        Title: "",
        Description: "",
        Tags: [],
        Rating: 3,
        IsPrivate: false,
        StorageUrl: "",
        FileName: ""
    }
    if (noteId != GUID_EMPTY){
        note = await getNoteByIdAsync(noteId!)
    }
    
    return (
        <article class="columns">
            <section>
                <CardPhoto storageUrl={note?.StorageUrl}>
                    <div class="p-2">
                        <input type="file" class="form-control w-100" id="file" name="File" accept="image/*" />
                    </div>
                </CardPhoto>
            </section>
            <section class="d-flex flex-column justify-content-between">
                <form name="editNote" id="editNote" hx-post={`/notes/edit/${note?.Id}`} hx-encoding='multipart/form-data' hx-include="#file">
                    <input type="hidden" name="Id" value={note?.Id}/>
                    <div class="mb-3">
                        <label htmlFor="title" class="form-label">Title</label>
                        <input type="text" class="form-control shadow-sm" id="title" name="Title" value={note?.Title} required
                               maxLength={200} autofocus/>
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
                        <label htmlFor="tags" class="form-label">Tags</label>
                        <input type="text" class="form-control shadow-sm" id="tags" name="Tags" maxLength={50}
                               value={(note?.Tags ?? []).join(' ')} autoComplete="on" required/>
                    </div>
                    <div class="input-group mb-3 shadow-sm">
                        <div class="input-group-text">
                            <input type="checkbox" class="form-check-input mt-0" id="isPrivate" name="IsPrivate"
                                   value="true" checked={note?.IsPrivate === true} />
                        </div>
                        <label class="form-control" htmlFor="isPrivate">Contains private or sensitive information</label>
                    </div>
                </form>
                <div class="d-flex justify-content-evenly gap-1 w-100" hx-target:inherited="#utilityModal_content">
                    <button type="submit" form="editNote" class="btn btn-primary shadow-sm w-25">Save</button>
                    <button type="button" class="btn btn-secondary shadow-sm w-25" hx-get={`/notes/details/${note?.Id}`}
                            hx-confirm="Are you sure you wish to cancel?">Cancel
                    </button>
                </div>
            </section>
        </article>
    )
}