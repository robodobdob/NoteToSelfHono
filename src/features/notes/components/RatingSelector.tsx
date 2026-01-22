function RatingSelector(props: { Rating: number }) {
    const { Rating } = props;

    return (
        <div hx-target:inherited="closest div" hx-swap:inherited="outerHTML" class="d-flex justify-content-between m-3">
            {[1,2,3,4,5].map(i =>  
                <span hx-get={`/ratingselector/${i}`} class={`rating-star rating-star-lg cursor-pointer ${i <= Rating ? "text-warning" : "text-secondary"}`}>*</span>
            )}
        </div>
    )
}

export default RatingSelector;