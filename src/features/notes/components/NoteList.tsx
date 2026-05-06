import ResetFilters from "../../search/components/ResetFilters";
import Icon from "../../shared/components/Icon";
import { tagsToList } from "../../shared/helpers";
import { searchTagsAsync, getLatestNotesAsync, searchNotesAsync } from "../notesService";

interface NoteListProps {
    query?: string;
    tags?: string[];
    hxTriggerName?: string;
}

function getHeaderText(query?: string, tags?: string[]): string {
    if (query) return query;
    if (tags && tags.length > 0) return tagsToList(tags);
    return "Latest Edits";
}

export default async function NoteList(props: NoteListProps) {
    const { query, tags, hxTriggerName } = props;
    const filterApplied = !!(query || (tags && tags.length > 0));

    let result;
    if (query) {
        result = await searchNotesAsync(query);
    } else if (tags && tags.length > 0) {
        result = await searchTagsAsync(tags);
    } else {
        result = await getLatestNotesAsync();
    }

    return (
        <>
            <ResetFilters/>

            <div class="list-title">
                <div class="fw-bold text-uppercase">{getHeaderText(query, tags)}</div>
                <button class="btn btn-sm btn-link p-0" id="refresh-button" hx-get="/notes/list" hx-target="#notes-list">                    
                    <Icon name={filterApplied ? "delete" : "refresh-ccw"}/>
                </button>
            </div>

            <div class="list-group shadow-sm" hx-target:inherited="#utilityModal_content">
                {result.Notes.length > 0
                    ? result.Notes.map(note =>
                        <div class={`list-group-item list-group-item-action note-list-item ${note.IsPrivate ? "private-note" : ""}`}>
                            <button command="show-modal" commandfor="utilityModal" hx-get={`/notes/details/${note.Id}`} class="btn">
                                {note.Title}
                            </button>
                            <rating-stars rating={note.Rating}/>
                        </div>
                    )
                    : <div class="list-group-item note-list-item">No notes found</div>
                }
            </div>

            <div class="note-count">
                Showing {result.Notes.length} of {result.TotalNotesCount} notes
            </div>
        </>
    )
}