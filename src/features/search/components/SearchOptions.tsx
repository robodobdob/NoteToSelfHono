import SearchBox from "./SearchBox";
import TagCloud from "./TagCloud";

export default function SearchOptions(){
    return (
        <dialog id="searchModal">
            <button class="btn btn-close btn-warning" type="button" command="close" commandfor="searchModal"></button>
            <div id="search-box">
                <SearchBox/>
            </div>
            <div id="tag-cloud">
                <TagCloud/>
            </div>
        </dialog>
    )
}