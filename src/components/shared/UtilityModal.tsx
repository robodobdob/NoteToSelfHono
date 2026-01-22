function UtilityModal() {
    return (
        <dialog id="utilityModal" class="w-100 h-100 p-7" hx-target:inherited="#utilityModal_content">
            <div class="position-absolute top-0 end-0 p-2">
                <button class="btn btn-close" type="button" command="close" commandfor="utilityModal"></button>
            </div>
            <div id="utilityModal_content" class="p-1 h-100"></div>
        </dialog>
    )
}

export default UtilityModal;