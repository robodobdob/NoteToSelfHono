interface RatingStarProps {
    rating: number;
}

function RatingStars(props: RatingStarProps) {
    const { rating } = props;
    return (
        <>
            {[1, 2, 3, 4, 5].map(i =>
                <span class={i <= rating ? `text-warning` : `text-secondary`}>★</span>
            )}
        </>
    )
}

export default RatingStars;