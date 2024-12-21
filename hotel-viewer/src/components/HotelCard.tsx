import React from 'react';
import Link from 'next/link';
import { Hotel } from '@/types/types';
import '@/styles/hotelCard.css'; // HotelCard specific styles

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel, variant = 'list' }: HotelCardProps & { variant?: 'list' | 'detail' }) {
  return (
    <li className={`hotel-card ${variant}`}>
      <Link href={`/hotels/${hotel.id}`} passHref legacyBehavior>
        <div style={{ cursor: 'pointer' }}>
          <img
            src={hotel.imageUrl}
            alt={hotel.name}
            width={1000}
            height={1000}
            onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
          />
          <div className="hotel-card-content">
            <h2>{hotel.name}</h2>
            <p>Location: {hotel.location}</p>
            <p>Rating: {hotel.rating}</p>
            <p>Dates of Travel: {hotel.datesOfTravel.join(', ')}</p>
            <p>Board Basis: {hotel.boardBasis}</p>
            <p>Available Room Types:</p>
            <ul className="rooms-list">
              {hotel.rooms && hotel.rooms.length > 0 ? (
                hotel.rooms.map((room, index) => (
                  <li key={index}>
                    {room.roomType} - Only {room.amount} rooms left on our site
                  </li>
                ))
              ) : (
                <li>No rooms available</li>
              )}
            </ul>
          </div>
        </div>
      </Link>
    </li>
  );
}
