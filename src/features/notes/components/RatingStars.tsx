interface RatingStarProps {
    rating: number;
    size?: string;
}

function RatingStar(props: RatingStarProps) {
    const { rating, size = 'star-md' } = props;
    return (
        <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(i =>
                <span class={`star ${size} ${i <= rating ? `text-warning` : `text-secondary`}`}>*</span>
            )}
        </div>
    )
}

export default RatingStar;