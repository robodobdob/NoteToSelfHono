import SearchBox from "../../search/components/SearchBox";
import TagCloud from "../../search/components/TagCloud";
import NoteList from "./NoteList";


function Refresh() {
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

export default Refresh;
