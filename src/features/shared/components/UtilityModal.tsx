import Working from "./Working";

export default function UtilityModal() {
    return (
        <dialog id="utilityModal" hx-indicator:inherited="#utilityModal_spinner">
            <Working Id="utilityModal_spinner"/>
            <button class="btn btn-close" type="button" command="close" commandfor="utilityModal"></button>
            <div id="utilityModal_content" hx-target:inherited="this"></div>
        </dialog>
    )
}