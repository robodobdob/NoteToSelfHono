function SearchBox() {
    return (
        <section id="search-box">
            <div className="fw-bold text-uppercase mb-3">Search by text</div>
            <form className="mb-3 d-flex" hx-get="/notelist" hx-indicator="#mainLayout_spinner" hx-target="#notes-list">
                <input type="text" className="form-control" name="Query" placeholder="Search..."/>
            </form>
        </section>
    )
}

export default SearchBox;