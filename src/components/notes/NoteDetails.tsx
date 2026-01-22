import RatingStars from "./RatingStars";
import { getNoteByIdAsync } from "../../services/NotesService";

const GUID_EMPTY = '00000000-0000-0000-0000-000000000000'

type NoteDetailsProps = {
    id: string | null;
}

function splitTags(tags: string): string[] {
    return tags.split('|').map(tag => tag.trim());
}

async function NoteDetails(props: NoteDetailsProps) {
    const { id } = props
    const note = await getNoteByIdAsync(id!)
    return (
        <>
            <div className="m-3 text-center note-image-wrapper">
                <img className="" src={note?.StorageUrl?.trim() ? note.StorageUrl : '/static/img/missing.jpg'} alt={note?.Title}/>
            </div>
            <div className="mb-3 text-center">
                <h3>
                    {note?.Title}
                </h3>
                <div>
                    <RatingStars Rating={note!.Rating}/>
                </div>
                <blockquote class="my-3">
                    {note!.Description}
                </blockquote>
            </div>
            <div className="mb-3 text-center">
                <a href={`https://duckduckgo.com/?q=${note!.Title}&ia=web`} target="_blank" rel="noopener noreferrer">Find this on the web</a>
            </div>
            <div className="mb-3 text-center">
                {splitTags(note!.Tags).map(tag =>
                    <span class="badge bg-secondary me-1">{tag}</span>
                )}
            </div>
            <div class="d-flex justify-content-evenly gap-1 w-100">
                <button class="btn btn-primary w-25" hx-trigger="click" hx-get={`/editnote/${note!.Id}`}>Edit</button>
                <button class="btn btn-danger w-25" hx-delete={`/deletenote/${note!.Id}`} hx-confirm="Are you sure you wish to delete this note?">Delete</button>    
            </div>
        </>
    )
}

export default NoteDetails;