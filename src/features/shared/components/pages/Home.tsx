import PageLayout from "../layout/PageLayout";
import NoteList from "../../../notes/components/NoteList";

function HomePage() {
    return (
        <PageLayout>
            <article>
                <div id="notes-list" hx-trigger="notes-updated from:body" hx-get="/notes/list">
                    <NoteList/>
                </div>
            </article>
        </PageLayout>
    );
}

export default HomePage;