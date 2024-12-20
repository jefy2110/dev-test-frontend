'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'; 
import { getHotels } from '@/helpers/api';
import { Hotel } from '@/types/types';
import '@/styles/hotels.css';

export default function HotelsList() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getHotels();
        setHotels(data);
      } catch (err) {
        setError('Failed to fetch hotels. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <p className="message">Loading hotels...</p>;
  if (error) return <p className="message">{error}</p>;

  return (
    <div className="hotels-container">
      <h1>Hotels List</h1>
      <ul className="hotels-list">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="hotel-card">
            <Link href={`/hotels/${hotel.id}`} passHref legacyBehavior >
              <div style={{ cursor: 'pointer' }}>
                <img src={hotel.imageUrl} alt={hotel.name} />
                <div className="hotel-card-content">
                  <h2>{hotel.name}</h2>
                  <p>Location: {hotel.location}</p>
                  <p>Rating: {hotel.rating}</p>
                  <p>Dates of Travel: {hotel.datesOfTravel.join(', ')}</p>
                  <p>Board Basis: {hotel.boardBasis}</p>
                  <p>Rooms:</p>
                  <ul className="rooms-list">
                    {hotel.rooms && hotel.rooms.length > 0 ? (
                      hotel.rooms.map((room, index) => (
                        <li key={index}>
                          {room.amount} x {room.roomType}
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
        ))}
      </ul>
    </div>
  );
}
