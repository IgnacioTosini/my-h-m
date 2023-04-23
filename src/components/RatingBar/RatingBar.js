import { useState } from "react";

// Componente para representar una estrella
const Star = ({ selected = false, onClick = f => f, color = "yellow" }) => (
    <div className={selected ? "star selected" : "star"} onClick={onClick}>
        <span role="img" aria-label="star" style={{ color }}>
            {/* Dependiendo si está seleccionada o no, muestra diferente caracter */}
            {selected ? "★" : "☆"}
        </span>
    </div>
);

// Componente para mostrar una barra de calificación con estrellas
const RatingBar = ({ rating, onRatingChange = f => f }) => {
    // Hook useState para actualizar el estado del componente
    const [currentRating, setCurrentRating] = useState(rating);

    // Función que maneja el evento click en las estrellas
    const handleClick = newRating => {
        // Si ya se ha marcado 1 estrella y vuelven a clickearla se deselecciona
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
                    selected={i < currentRating} // La estrella actual está seleccionada si su índice es menor que la puntuación actual
                    onClick={() => handleClick(i + 1)}
                    color={"yellow"}
                />
            ))}
        </div>
    );
};

export default RatingBar;
