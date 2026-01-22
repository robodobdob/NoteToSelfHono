import SearchBox from "./SearchBox";
import TagCloud from "./TagCloud";
import NoteList from "./NoteList";

function ResetFilters() {
  return (
        <>
            <hx-partial hx-target="#search-box" hx-swap="outerHTML">
                <SearchBox/>
            </hx-partial>

            <hx-partial hx-target="#tag-cloud" hx-swap="outerHTML">
                <TagCloud/>
            </hx-partial>

            <hx-partial hx-target="#notes-list">
                <NoteList/>
            </hx-partial>
        </>
    )
}

export default ResetFilters;