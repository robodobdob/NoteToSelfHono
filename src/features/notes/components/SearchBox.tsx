function SearchBox() {
    return (
        <section id="search-box">
            <div class="fw-bold text-uppercase mb-3">Search by text</div>
            <form class="mb-3 d-flex" hx-get="/notelist" hx-indicator="#mainLayout_spinner" hx-target="#notes-list">
                <input type="text" class="form-control shadow-sm" name="Query" placeholder="Search..."/>
            </form>
        </section>
    )
}

export default SearchBox;