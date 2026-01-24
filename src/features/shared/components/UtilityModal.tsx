function UtilityModal() {
    return (
        <>
            <dialog id="utilityModal" class="w-100" hx-target:inherited="#utilityModal_content">
                <div class="position-absolute top-0 end-0 p-2 d-flex">
                    <button class="btn btn-close" type="button" command="close" commandfor="utilityModal"></button>
                </div>
                <div id="utilityModal_content" class="p-3"></div>
            </dialog>
            <script src="/static/js/utilityModal.js"></script>
        </>
    )
}

export default UtilityModal;