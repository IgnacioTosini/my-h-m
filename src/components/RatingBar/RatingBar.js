import { useState } from "react";

const Star = ({ selected = false, onClick = f => f, color = "yellow" }) => (
    <div className={selected ? "star selected" : "star"} onClick={onClick}>
        <span role="img" aria-label="star" style={{ color }}>
            {selected ? "★" : "☆"}
        </span>
    </div>
);

const RatingBar = ({ rating, onRatingChange = f => f }) => {
    const [currentRating, setCurrentRating] = useState(rating);

    const handleClick = newRating => {
        if (newRating === 1 && currentRating === 1) {
            setCurrentRating(0);
        } else {
            setCurrentRating(newRating);
            onRatingChange(newRating);
        }
    };

    return (
        <div className="rating-bar">
            {[...Array(5)].map((n, i) => (
                <Star
                    key={i}
                    selected={i < currentRating}
                    onClick={() => handleClick(i + 1)}
                    color={"yellow"}
                />
            ))}
        </div>
    );
};

export default RatingBar;