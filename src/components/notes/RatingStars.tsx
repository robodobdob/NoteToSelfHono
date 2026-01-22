interface RatingStarProps {
    Rating: number;
}

function RatingStar(props: RatingStarProps) {
    return (
        <>
        {[1,2,3,4,5].map(i =>  
            <span class={i <= props.Rating ? "rating-star text-warning" : "rating-star text-secondary"}>*</span>
        )}
        </>        
    )
}

export default RatingStar;