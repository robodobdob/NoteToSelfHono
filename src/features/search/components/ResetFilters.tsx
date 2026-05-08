import SearchBox from "./SearchBox";
import TagCloud from "./TagCloud";

interface ResetProps {
  trigger?: string;
}

export default function ResetFilters(props: ResetProps){
    const { trigger } = props;

    return (
        <>
            {trigger && ['form#tag-form', 'button#refresh-button', 'form#editNote', 'div#notes-list'].includes(trigger) &&
                <hx-partial hx-target="#search-box" hx-swap="outerHTML">
                    <SearchBox/>
                </hx-partial>
            }
            {trigger && ['form#search-form', 'button#refresh-button', 'form#editNote', 'div#notes-list'].includes(trigger) &&
                <hx-partial hx-target="#tag-cloud" hx-swap="outerHTML">
                    <TagCloud/>
                </hx-partial>
            }
        </>
    )
}