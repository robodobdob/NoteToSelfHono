import PageLayout from "../layout/PageLayout";
import NoteList from "../../../notes/components/NoteList";
import SearchBox from "../../../notes/components/SearchBox";
import TagCloud from "../../../notes/components/TagCloud";

function HomePage() {
    return (
        <PageLayout>
            
            <section id="filters" hx-trigger="notes-updated from:body" hx-get="/reset?search=true&tags=true" hx-indicator="#mainLayout_spinner">
                <SearchBox/>
                <TagCloud/>        
            </section>

            <section id="notes-list" hx-trigger="notes-updated from:body" hx-get="/reset?list=true" hx-indicator="#mainLayout_spinner">
                <NoteList/>
            </section>

        </PageLayout>
    );
}

export default HomePage; // Ensure default export