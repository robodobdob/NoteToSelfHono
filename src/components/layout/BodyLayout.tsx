function BodyLayout(props: any) {
    return(
        <html lang="en">

        <head>
            <meta charset="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <base href="/"/>
            <link rel="stylesheet" href="/static/css/bootstrap.min.css"/>
            <link rel="stylesheet" href="/static/css/app.css"/>
            <link rel="icon" type="image/x-icon" href="/static/favicon.ico"/>
            <title>Note to self...</title>
        </head>

        <body>
            {props.children}

            <script src="https://cdn.jsdelivr.net/npm/htmx.org@4.0.0-alpha6/dist/htmx.min.js" integrity="sha384-/5n21KGM472oBhvzUrvju8FRDq/4WNMS3TGw5RWFkZR/kq+sCevqNXFcakqRtaHu" crossorigin="anonymous"></script>
            <script src="https://unpkg.com/hyperscript.org@0.9.14"></script>
            <script src="/static/js/UtilityModal.js"></script>
        </body>

        </html>
    )
}

export default BodyLayout;