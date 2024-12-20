'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getHotels } from '@/helpers/api';
import { Hotel } from '@/types/types';
import '@/styles/hotels.css';
import fallbackHotels from '@/data/hotels.json'; // Import fallback data

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
        console.error('Error fetching hotels from API:', err);
        setHotels(fallbackHotels); // Use fallback data
        setError('Unable to connect to the backend. Loaded local data instead.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <p className="message">Loading hotels...</p>;
  if (error) console.warn(error);

  return (
    <div className="hotels-container">
      <h1>Browse Our Wide Range of Hotels!</h1>
      <ul className="hotels-list">
        {hotels.map((hotel) => (
          <li key={hotel.id} className="hotel-card">
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
