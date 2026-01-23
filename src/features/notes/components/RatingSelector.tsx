function RatingSelector(props: { rating: number }) {
    const { rating } = props;

    return (
        <div hx-target:inherited="closest div" hx-swap:inherited="outerHTML" class="d-flex justify-content-between m-3 rating-stars">
            {[1,2,3,4,5].map(i =>  
                <span hx-get={`/ratingselector/${i}`} class={`star star-lg pointer ${i <= rating ? "text-warning" : "text-secondary"}`}>*</span>
            )}
        </div>
    )
}

export default RatingSelector;