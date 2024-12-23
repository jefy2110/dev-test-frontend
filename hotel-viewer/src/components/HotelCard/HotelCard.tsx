import React from 'react';
import Link from 'next/link';
import { Hotel } from '@/types/types';
import './hotelCard.css';
import { renderStars } from '../StarIcon/StarIcon';  
import HeartButton from '../SaveHotelButton/SaveHotel';
import { getRatingDetails } from '@/helpers/rating';
interface HotelCardProps {
  hotel: Hotel;
  variant?: 'list' | 'detail';
}

//Custom card component for displaying hotel information.
export default function HotelCard({ hotel, variant = 'list' }: HotelCardProps) {
  const googleMapsLink = `${process.env.REACT_APP_GOOGLE_MAPS_LINK}${encodeURIComponent(
    hotel.location
  )}`;

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Link href={`/hotels/${hotel.id}`} passHref legacyBehavior>
      <div className={`hotel-card ${variant}`}>
        <div className={`hotel-card-image ${variant}`}>
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            width={1000}
            height={1000}
            onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
          />
        </div>
        <div className={`hotel-card-content ${variant}`}>
          <div className={`hotel-card-mainContent ${variant}`}>
            <div style={{ display: 'flex', alignItems: 'center', columnGap:'20px' }}>
              <h2>{hotel.name}</h2>
              <div>{renderStars(hotel.rating)}</div>  
            </div>

            <a
              className={`hotel-card-location ${variant}`}
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
            >
              {hotel.location}
            </a>

            <p className={`hotel-card-dateOfTravel ${variant}`}>Available from <br />{hotel.datesOfTravel.join(' to ')}</p>
            <p className={`hotel-card-board-basis ${variant}`}>{hotel.boardBasis}</p>

            <ul className={`rooms-list ${variant}`}>
              {hotel.rooms && hotel.rooms.length > 0 ? (
                hotel.rooms.map((room, index) => (
                  <li key={index}>
                    {room.roomType}
                  </li>
                ))
              ) : (
                <li className={`rooms-none ${variant}`}>Sold Out</li>
              )}
            </ul>
          </div>

          <div className={`hotel-card-extraContent ${variant}`}>
            {(() => {
              const { description, color } = getRatingDetails(hotel.rating);
              return (
                <p
                  style={{ backgroundColor: color }}
                  className={`hotel-card-numberRating ${variant}`}
                >
                  {description} {hotel.rating}
                </p>
              );
            })()}
            <HeartButton/>
          </div>
        </div>
      </div>
    </Link>
  );
}
