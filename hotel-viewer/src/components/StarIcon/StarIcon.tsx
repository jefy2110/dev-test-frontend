import React from 'react';

interface StarIconProps {
  fillPercentage?: number;
}
// component for displaying amount of stars a hotel has based on the rating.
export const StarIcon = ({ fillPercentage = 100 }: StarIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id={`grad-${fillPercentage}`}>
        <stop offset={`${fillPercentage}%`} stopColor="gold" />
        <stop offset={`${fillPercentage}%`} stopColor="lightgray" />
      </linearGradient>
    </defs>
    <path
      fill={`url(#grad-${fillPercentage})`}
      d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01z"
    />
  </svg>
);


export const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const partialFill = (rating % 1) * 100;
  const emptyStars = 5 - Math.ceil(rating);

  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<StarIcon key={`full-${i}`} fillPercentage={100} />);
  }

  if (partialFill > 0) {
    stars.push(<StarIcon key="partial" fillPercentage={partialFill} />);
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(<StarIcon key={`empty-${i}`} fillPercentage={0} />);
  }

  return stars;
};