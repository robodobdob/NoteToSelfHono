import Icon from "../../shared/components/Icon";
import RatingStars from "./RatingStars";
import { Note } from "../../../models";
import SearchBox from "./SearchBox";
import TagCloud from "./TagCloud";
import { tagsToList } from "../../shared/helpers";
import { searchTagsAsync, getLatestNotesAsync, searchNotesAsync } from "../NotesService";

interface NotelistProps {
    query?: string;
    tags?: string[];
}

function getHeaderText(query?: string, tags?: string[]): string{
    if (query) return query;
    if (tags && tags.length > 0) return tagsToList(tags);
    return "Latest Edits";
}
async function NoteList(props: NotelistProps) {
    const { query, tags } = props;

    let notes: Note[];
    if (query) {
        notes = await searchNotesAsync(query);
    } else if (tags && tags.length > 0) {
        notes = await searchTagsAsync(tags);
    } else {
        notes = await getLatestNotesAsync();
    }

    return (
        <>
            {(tags && tags.length > 0) &&
                <hx-partial hx-target="#search-box" hx-swap="outerHTML">
                    <SearchBox/>
                </hx-partial>
            }
            {query &&
                <hx-partial hx-target="#tag-cloud" hx-swap="outerHTML">
                    <TagCloud/>
                </hx-partial>
            }

            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="fw-bold text-uppercase">{getHeaderText(query, tags)}</div>
                <button class="btn btn-sm btn-link p-0" hx-get="/reset?search=true&tags=true&list=true" hx-indicator="#mainLayout_spinner">
                    <Icon name={(query || tags) ? 'delete' : 'rotate-cw'} filled={false} size={16} />
                </button>
            </div>

            <div class="list-group" hx-target:inherited="#utilityModal_content">
            {notes.map(note =>
                <button type="button" command="show-modal" commandfor="utilityModal" hx-get={`/notedetails/${note.Id}`} class="list-group-item list-group-item-action note-list-item">
                    <span class="text-start">{note.Title}</span>
                    <span class="text-end text-nowrap ms-1 fs-6">
                        <RatingStars rating={note.Rating}/>
                    </span>
                </button>
            )}
            </div>
        </>
    )
}

export default NoteList;