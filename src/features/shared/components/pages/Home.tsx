import PageLayout from "../layout/PageLayout";
import NoteList from "../../../notes/components/NoteList";

export default function HomePage() {
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