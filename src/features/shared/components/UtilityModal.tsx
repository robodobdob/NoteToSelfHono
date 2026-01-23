function UtilityModal() {
    return (
        <>
            <dialog id="utilityModal" className="w-100" hx-target:inherited="#utilityModal_content">
                <div className="position-absolute top-0 end-0 p-2 d-flex">
                    <button className="btn btn-close" type="button" command="close" commandfor="utilityModal"></button>
                </div>
                <div id="utilityModal_content" className="p-3"></div>
            </dialog>
            <script src="/static/js/utilityModal.js"></script>
        </>
    )
}

export default UtilityModal;