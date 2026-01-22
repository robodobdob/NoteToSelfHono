function SearchBox() {
    return (
        <section id="search-box">
            <form className="mb-3 d-flex" hx-get="/notelist" hx-indicator="#mainLayout_spinner" hx-target="#notes-list">
                <input type="text" className="form-control" name="Query" placeholder="Search..."/>
            </form>
        </section>
    )
}

export default SearchBox;