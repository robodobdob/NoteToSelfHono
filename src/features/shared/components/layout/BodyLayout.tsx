import { html } from "hono/html";
import type { Child } from 'hono/jsx';

interface BodyLayoutProps {
    title?: string;
    children?: Child;
}

function BodyLayout(props: BodyLayoutProps) {
    const title = props.title ?? 'Note to self...';
    return (html`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, user-scalable=no">
            <base href="/"/>
            <link rel="stylesheet" href="/static/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="/static/css/app.css"/>
            <link rel="icon" type="image/x-icon" href="/static/img/favicon.ico"/>
            <meta name="htmx-config" content='{"extensions":"sse"}'>
            <title>${title}</title>
        </head>

        <body>
        ${props.children}
        <script src="/static/js/htmx-4.0.0-alpha8.min.js" defer crossorigin="anonymous"></script>
        <script src="/static/js/hx-sse.min.js" defer crossorigin="anonymous"></script>
        <script src="/static/js/alpine-3.15.8.min.js" defer></script>
        <script src="/static/js/components.js" defer></script>
        </body>

        </html>
    `)
}

export default BodyLayout;