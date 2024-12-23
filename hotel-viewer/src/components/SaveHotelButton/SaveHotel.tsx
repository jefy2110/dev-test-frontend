import React, { useState } from 'react';
import './SaveHotel.css';

interface HeartButtonProps {
  initialLiked?: boolean;
  onToggle?: (liked: boolean) => void;
}
// button component with no functionality currently but is meant to simulate saving a hotel to favourite or bookmarked list for later viewing.
export default function HeartButton({ initialLiked = false, onToggle }: HeartButtonProps) {
  const [liked, setLiked] = useState(initialLiked);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    const newLiked = !liked;
    setLiked(newLiked);
    if (onToggle) {
      onToggle(newLiked);
    }
  };

  return (
    <button className="like-button" onClick={toggleLike} aria-label="Like hotel">
      {liked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          fill="red"
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="44"
          height="44"
          fill="none"
          stroke="darkgrey"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      )}
    </button>
  );
}