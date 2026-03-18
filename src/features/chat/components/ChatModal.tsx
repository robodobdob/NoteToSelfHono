import ChatForm from "./ChatForm";

function ChatModal() {
    return (
        <dialog id="chatModal">
            <button class="btn btn-close" type="button" command="close" commandfor="chatModal"></button>
            <div id="chatModal_content">
                <ChatForm/>
                <div hx-get="/chat/events" hx-trigger="load" hx-target="#chatMessages" hx-swap="beforeend" hx-ext="sse">
                    <div id="chatMessages" class="messages"></div>
                </div>
            </div>
        </dialog>
    )
}

export default ChatModal;
