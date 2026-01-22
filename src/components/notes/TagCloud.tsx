import { getAllTagsAsync } from "../../services/NotesService";

async function TagCloud() {
    const tags = await getAllTagsAsync();

    return (
        <section id="tag-cloud">
            <form className="d-flex justify-content-center flex-wrap mb-3 gap-2" hx-get="/notelist" hx-indicator="#mainLayout_spinner" hx-target="#notes-list" hx-trigger="change">
                {tags.map(tag =>
                    <span>
                        <input type="checkbox" className="btn-check" value={tag.Name} name="Tags" id={tag.Name} autoComplete="off"/>
                        <label className="btn btn-sm btn-outline-primary rounded-pill" htmlFor={tag.Name}>
                            {tag.Name}&nbsp;<span className="badge bg-primary">{tag.Count}</span>
                        </label>
                    </span>
                )}
            </form>
        </section>
    )
}
export default TagCloud;
