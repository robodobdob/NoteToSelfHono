import { html } from "hono/html";

interface BodyLayoutProps {
    title?: string;
    children?: any;
}

function BodyLayout(props: BodyLayoutProps) {
    const title = props.title ?? 'Note To Self';
    return (html`
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, user-scalable=no">
            <base href="/"/>
            <link rel="stylesheet" href="/static/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="/static/css/common.css"/>
            <link id="theme-stylesheet" rel="stylesheet" href="/static/css/colors-light.css" />
            <link rel="icon" type="image/x-icon" href="/static/img/favicon.ico"/>

            <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png">
            <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png">
            <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png">
            <link rel="manifest" href="/static/site.webmanifest">

            <script src="/static/js/htmx-4.0.0-beta1.min.js" defer crossorigin="anonymous"></script>
            <script src="/static/js/hx-sse.min.js" defer crossorigin="anonymous"></script>
            <script src="/static/js/alpine-3.15.8.min.js" defer></script>
            <script src="/static/js/components.js" defer></script>
            <meta name="htmx-config" content='{"extensions":"sse"}'>
            <title>${title}</title>
        </head>

        <body>
        ${props.children}
        </body>

        </html>
    `)
}

export default BodyLayout;