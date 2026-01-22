function UtilityModal() {
    return (
        <>
            <dialog id="utilityModal" className="w-100 h-100 p-7" hx-target:inherited="#utilityModal_content">
                <div className="position-absolute top-0 end-0 p-2">
                    <button className="btn btn-close" type="button" command="close" commandfor="utilityModal"></button>
                </div>
                <div id="utilityModal_content" className="p-1 h-100"></div>
            </dialog>
            <script src="/static/js/utilityModal.js"></script>
        </>
    )
}

export default UtilityModal;