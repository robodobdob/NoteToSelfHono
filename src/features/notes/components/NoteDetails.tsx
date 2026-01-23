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
                <div className="mb-3 text-center">
                    <h3>
                        {note?.Title}
                    </h3>
                    <div class="d-flex justify-content-evenly my-3">
                        <RatingStars rating={note!.Rating} size="star-lg"/>
                    </div>
                    <blockquote className="my-3">
                        {note!.Description}
                    </blockquote>
                </div>
                <div className="mb-3 text-center">
                    <a href={`https://duckduckgo.com/?q=${note!.Title}&ia=web`} target="_blank"
                       rel="noopener noreferrer">Find this item on the web</a>
                </div>
                <div className="mb-3 text-center">
                    {splitTags(note!.Tags).map(tag =>
                        <span className="badge rounded-pill bg-primary m-1">{tag}</span>
                    )}
                </div>
                <div className="d-flex justify-content-evenly gap-1 w-100">
                    <button className="btn btn-primary w-25" hx-trigger="click" hx-get={`/editnote/${note!.Id}`}>Edit</button>
                    <button className="btn btn-danger w-25" hx-delete={`/deletenote/${note!.Id}`}
                            hx-confirm="Are you sure you wish to delete this note?">Delete
                    </button>
                </div>
            </section>
        </article>
    )
}

export default NoteDetails;