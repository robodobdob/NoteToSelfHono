import { html } from "hono/html";

function BodyLayout(props: any) {
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
            <title>Note to self...</title>
        </head>

        <body>
        ${props.children}
        <script src="/static/js/htmx-4.0.0-alpha6.min.js" defer crossorigin="anonymous"></script>
        <script src="/static/js/hyperscript-0.9.14.min.js" defer></script>
        <script src="/static/js/webComponents.js" defer></script>
        </body>

        </html>
    `)
}

export default BodyLayout;