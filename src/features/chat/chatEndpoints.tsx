import { Hono } from 'hono'
import { streamSSE } from 'hono/streaming'
import ChatForm from './components/ChatForm'

const app = new Hono()

// In-memory message store for SSE broadcast
const chatMessages: { id: number; text: string; timestamp: string }[] = [];
let messageId = 0;
const subscribers = new Set<(msg: string) => void>();

app.post('/chat/message', async (c) => {
    const body = await c.req.parseBody();
    const text = String(body.Message ?? '').trim();

    if (text) {
        const msg = { id: ++messageId, text, timestamp: new Date().toISOString() };
        chatMessages.push(msg);
        // Broadcast to SSE subscribers
        const event = `<div class="message">${text}</div>`;
        subscribers.forEach(send => send(event));
    }

    return c.html(<ChatForm />)
})

app.get('/chat/events', (c) => {
    return streamSSE(c, async (stream) => {
        // Send existing messages on connect
        for (const msg of chatMessages) {
            await stream.writeSSE({
                data: `<div class="message">${msg.text}</div>`,
                event: 'message',
                id: String(msg.id),
            });
        }

        // Register this subscriber
        const send = async (data: string) => {
            await stream.writeSSE({ data, event: 'message' });
        };
        subscribers.add(send);

        // Keep connection alive until client disconnects
        await new Promise<void>((resolve) => {
            stream.onAbort(() => {
                subscribers.delete(send);
                resolve();
            });
        });
    });
})

export default app;
