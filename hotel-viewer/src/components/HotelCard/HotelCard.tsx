import React from 'react';
import Link from 'next/link';
import { Hotel } from '@/types/types';
import './hotelCard.css';
import { renderStars } from '../StarIcon/StarIcon';  
import HeartButton from '../SaveHotelButton/SaveHotel';

interface HotelCardProps {
  hotel: Hotel;
  variant?: 'list' | 'detail';
}

const getRatingDescription = (rating: number) => {
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4) return 'Great';
  if (rating >= 3) return 'Good';
  if (rating >= 2) return 'Fair';
  return 'Poor';
};

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
          <div style={{ display: 'flex', alignItems: 'center', columnGap:'20px' }}>
            <h2>{hotel.name}</h2>
            <div>{renderStars(hotel.rating)}</div>  
          </div>

          <a
            className='hotel-card-location'
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
          >
            {hotel.location}
          </a>

          <p className='hotel-card-dateOfTravel'>Visit from <br />{hotel.datesOfTravel.join(' to ')}</p>
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

        <div className="hotel-card-extraContent">
          <p>{getRatingDescription(hotel.rating)} {hotel.rating}</p>  
          <HeartButton onToggle={handleHeartToggle} />
        </div>
      </div>
    </Link>
  );
}