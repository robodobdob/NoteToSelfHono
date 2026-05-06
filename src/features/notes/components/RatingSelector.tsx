interface RatingSelectorProps {
    rating: number;
}

export default function RatingSelector(props: RatingSelectorProps) {
    const { rating } = props;
    return (
        <div id="wrapper" hx-target:inherited="closest div" hx-swap:inherited="outerHTML">
            <input id="rating" type="hidden" name="Rating" value={rating} />
            {[1,2,3,4,5].map(i =>  
                <span hx-get={`/notes/rating/${i}`} class={`pointer ${i <= rating ? "text-warning" : "text-secondary"}`}>★</span>
            )}
        </div>
    )
}