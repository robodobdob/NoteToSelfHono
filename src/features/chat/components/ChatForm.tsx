function ChatForm() {
    return (
        <form hx-post="/chat/message" hx-target="this" hx-swap="outerHTML">
            <div class="input-group mb-3">
                <input type="text" class="form-control" id="message" name="Message" maxLength={200} required
                       autofocus placeholder="Message" aria-label="Message" aria-describedby="chat-send-btn"/>
                <button class="btn btn-outline-secondary" type="submit" id="chat-send-btn">Send</button>
            </div>
        </form>
    )
}

export default ChatForm;
