import { getAllTagsAsync } from "../../notes/notesService";

export default async function TagCloud() {
    const tags = await getAllTagsAsync();

    return (
        <section id="tag-cloud">
            <div id="label">Filter by tag</div>
            <form id="tag-form" hx-get="/notes/list"
                  hx-indicator="#mainLayout_spinner" hx-target="#notes-list" hx-trigger="change">
                {tags.map(tag =>
                    <span>
                        <input type="checkbox" class="btn-check" value={tag.Name} name="Tags" id={tag.Name}
                               autoComplete="off"/>
                        <label class="btn btn-sm btn-outline-primary rounded-pill shadow-sm" htmlFor={tag.Name}>
                            {tag.Name}&nbsp;<span class="badge bg-primary">{tag.Count}</span>
                        </label>
                    </span>
                )}
            </form>
        </section>
    )
}