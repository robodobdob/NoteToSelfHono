import NoteList from "./NoteList";
import SearchBox from "./SearchBox";
import TagCloud from "./TagCloud";

interface ResetProps {
  search?: boolean;
  tags?: boolean;
  list?: boolean;
}

function Reset(props: ResetProps){
    const { search = false, tags = false, list = false } = props;

    return (
        <>
            {search && 
                <hx-partial hx-target="#search-box" hx-swap="outerHTML">
                    <SearchBox/>
                </hx-partial>
            }
            {tags && 
                <hx-partial hx-target="#tag-cloud" hx-swap="outerHTML">
                    <TagCloud/>
                </hx-partial>
            }
            {list && 
                <hx-partial hx-target="#notes-list" hx-swap="outerHTML">
                    <NoteList/>
                </hx-partial>
            }
        </>
    )
}

export default Reset;