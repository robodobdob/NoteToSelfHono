import PageLayout from "../layout/PageLayout";
import NoteList from "../../../notes/components/NoteList";
import SearchBox from "../../../notes/components/SearchBox";
import TagCloud from "../../../notes/components/TagCloud";

function HomePage() {
    return (
        <PageLayout>
            <article id="home-page" class="columns">
                <section id="filters">
                    <SearchBox/>
                    <TagCloud/>
                </section>
                <section id="notes-list">
                    <NoteList/>
                </section>
            </article>
        </PageLayout>
    );
}

export default HomePage;