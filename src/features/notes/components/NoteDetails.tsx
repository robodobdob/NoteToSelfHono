import { getNoteByIdAsync } from "../notesService";

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
                <div class="p-3 shadow-sm text-center note-image-wrapper">
                    <img src={note?.StorageUrl?.trim() ? note.StorageUrl : '/static/img/missing.jpg'} alt={note?.Title}/>
                </div>
            </section>
            <section class="d-flex flex-column justify-content-between">
                <div>
                    <div class="mb-3 text-center">
                        <h3>
                            {note?.Title}
                        </h3>
                        <div class="my-3 fs-3">
                            <rating-stars rating={note!.Rating}/>
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
                </div>
                <div class="d-flex justify-content-evenly gap-1 w-100">
                    <button class="btn btn-primary shadow-sm w-25" hx-trigger="click"
                            hx-get={`/editnote/${note!.Id}`}>Edit
                    </button>
                    <button class="btn btn-danger shadow-sm w-25" hx-delete={`/deletenote/${note!.Id}`}
                            hx-confirm="Are you sure you wish to delete this note?">Delete
                    </button>
                </div>
            </section>
        </article>
    )
}

export default NoteDetails;