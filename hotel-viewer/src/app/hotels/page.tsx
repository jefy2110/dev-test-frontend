"use client";
import React, { useEffect, useState } from 'react';
import { getHotels } from '@/helpers/api';
import { Hotel } from '@/types/types';
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

  if (loading) return <p>Loading hotels...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Hotels List</h1>
      <ul>
        {hotels.map((hotel) => (
          <li key={hotel.id}>
            <h2>{hotel.name}</h2>
            <p>Location: {hotel.location}</p>
            <p>Rating: {hotel.rating}</p>
            <img src={hotel.imageUrl} alt={hotel.name} width={200} />
            <p>Dates of Travel: {hotel.datesOfTravel.join(', ')}</p>
            <p>Board Basis: {hotel.boardBasis}</p>
            <p>Rooms:</p>
            <ul>
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
          </li>
        ))}
      </ul>
    </div>
  );
}