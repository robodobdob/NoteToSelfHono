import RatingStars from "./RatingStars";
import { getNoteByIdAsync } from "../../../services/NotesService";

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
        <article class="columns">
            <section>
                <div class="p-3 shadow text-center note-image-wrapper">
                    <img src={note?.StorageUrl?.trim() ? note.StorageUrl : '/static/img/missing.jpg'} alt={note?.Title}/>
                </div>
            </section>
            <section>
                <div class="mb-3 text-center">
                    <h3>
                        {note?.Title}
                    </h3>
                    <div class="d-flex justify-content-evenly my-3 fs-3">
                        <RatingStars rating={note!.Rating}/>
                    </div>
                    <blockquote class="my-3">
                        {note!.Description}
                    </blockquote>
                </div>
                <div class="mb-3 text-center">
                    <a href={`https://duckduckgo.com/?q=${note!.Title}&ia=web`} target="_blank"
                       rel="noopener noreferrer">Find this item on the web</a>
                </div>
                <div class="mb-3 text-center">
                    {splitTags(note!.Tags).map(tag =>
                        <span class="badge rounded-pill bg-primary m-1">{tag}</span>
                    )}
                </div>
                <div class="d-flex justify-content-evenly gap-1 w-100">
                    <button class="btn btn-primary w-25" hx-trigger="click" hx-get={`/editnote/${note!.Id}`}>Edit</button>
                    <button class="btn btn-danger w-25" hx-delete={`/deletenote/${note!.Id}`}
                            hx-confirm="Are you sure you wish to delete this note?">Delete
                    </button>
                </div>
            </section>
        </article>
    )
}

export default NoteDetails;