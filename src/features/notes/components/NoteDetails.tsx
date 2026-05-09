import { getNoteByIdAsync } from "../notesService";
import CardPhoto from "./CardPhoto";
import Icon from "../../shared/components/Icon.tsx";

type NoteDetailsProps = {
    id: string | null;
}

export default async function NoteDetails(props: NoteDetailsProps) {
    const { id } = props
    const note = await getNoteByIdAsync(id!)
    return (
        <article class="columns">
            <section>
                <CardPhoto storageUrl={note?.StorageUrl} />
            </section>
            <section id="note-details-section" class="d-flex flex-column justify-content-between">
                <div>
                    <div className="mb-3 text-center">
                        <h3>
                            {note?.Title}
                        </h3>
                        <div className="d-flex justify-content-evenly my-3 fs-3">
                            <rating-stars rating={note!.Rating}/>
                        </div>
                        <blockquote class="my-3">
                            {note!.Description}
                        </blockquote>
                    </div>
                    <div className="mb-3 text-center">
                        <a href={`https://duckduckgo.com/?q=${note!.Title}&ia=web`} target="_blank"
                           rel="noopener noreferrer">Find this item on the web</a>
                    </div>
                    <div className="mb-3 text-center">
                        {(note!.Tags ?? []).map(tag =>
                            <span class="badge rounded-pill bg-primary m-1">{tag}</span>
                        )}
                    </div>
                </div>
                 <div className="d-flex justify-content-between gap-1 w-100">
                    <button className="btn btn-outline-primary shadow-sm" hx-trigger="click"
                            hx-get={`/notes/edit/${note!.Id}`}>
                        <Icon name="edit"/>
                    </button>
                    <button className="btn btn-outline-danger shadow-sm" hx-delete={`/notes/delete/${note!.Id}`}
                            hx-confirm="Are you sure you wish to delete this note?">
                        <Icon name="trash-2"></Icon>
                    </button>
                </div>
            </section>
        </article>
    )
}