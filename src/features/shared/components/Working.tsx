interface WorkingProps {
    Id: string;
}

function Working(props: WorkingProps) {
    return (
        <div id={props.Id} class="htmx-indicator">
            <span class="badge rounded-pill text-bg-warning py-2 d-flex align-items-center gap-2">
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                <span role="status">Working...</span>
            </span>
        </div>
    )
}

export default Working;