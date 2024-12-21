import React from 'react';
import Link from 'next/link';
import { Hotel } from '@/types/types';
import '@/styles/hotelCard.css';
import { renderStars } from './StarIcon';  // Import renderStars
import HeartButton from './SaveHotel';

interface HotelCardProps {
  hotel: Hotel;
  variant?: 'list' | 'detail';
}

export default function HotelCard({ hotel, variant = 'list' }: HotelCardProps) {
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    hotel.location
  )}`;

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleHeartToggle = (liked: boolean) => {
    console.log(`Hotel ${hotel.name} was ${liked ? 'liked' : 'unliked'}`);
  };

  return (
    <Link href={`/hotels/${hotel.id}`} passHref legacyBehavior>
      <div className={`hotel-card ${variant}`}>
        <div className="hotel-card-image">
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            width={1000}
            height={1000}
            onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
          />
        </div>
        <div className="hotel-card-content">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2>{hotel.name}</h2>
            <div>{renderStars(hotel.rating)}</div>  
          </div>

          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            {hotel.location}
          </a>

          <p>Dates of Travel: {hotel.datesOfTravel.join(', ')}</p>
          <p className="hotel-card-board-basis">{hotel.boardBasis}</p>

          <ul className="rooms-list">
            {hotel.rooms && hotel.rooms.length > 0 ? (
              hotel.rooms.map((room, index) => (
                <li key={index}>
                  {room.roomType}
                </li>
              ))
            ) : (
              <li className='rooms-none'>Sold Out</li>
            )}
          </ul>
        </div>

        <div className="hotel-card-extra">
          <HeartButton onToggle={handleHeartToggle} />
        </div>
      </div>
    </Link>
  );
}
