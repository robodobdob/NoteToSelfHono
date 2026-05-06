export default function SearchBox() {
    return (
        <section id="search-box">
            <div id="label">Search by text</div>
            <form id="search-form" hx-get="/notes/list" hx-indicator="#mainLayout_spinner" hx-target="#notes-list">
                <input type="search" class="form-control shadow-sm" name="Query" placeholder="Search..." autofocus/>
            </form>
        </section>
    )
}