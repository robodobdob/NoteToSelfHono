interface RatingSelectorProps {
    rating: number;
}

function RatingSelector(props: RatingSelectorProps) {
    const { rating } = props;
    return (
        <div hx-target:inherited="closest div" hx-swap:inherited="outerHTML" class="d-flex justify-content-between fs-3">
            <input id="rating" type="hidden" name="Rating" value={rating} />
            {[1,2,3,4,5].map(i =>  
                <span hx-get={`/ratingselector/${i}`} class={`pointer ${i <= rating ? "text-warning" : "text-secondary"}`}>★</span>
            )}
        </div>
    )
}

export default RatingSelector;