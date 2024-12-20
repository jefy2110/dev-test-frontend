'use client';
import React, { useEffect, useState } from 'react';
import { getHotelById } from '@/helpers/api';
import { Hotel } from '@/types/types';
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import '@/styles/hotels[id].css';

export default function HotelDetail() {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams(); // Extract hotel ID from the URL
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        if (!id) throw new Error('No hotel ID provided');
        const data = await getHotelById(id);
        setHotel(data);
      } catch (err) {
        setError('Failed to fetch hotel details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) return <p className="message">Loading hotel details...</p>;
  if (error) return <p className="message">{error}</p>;
  if (!hotel) return <p className="message">Hotel not found.</p>;

  return (
    <div className="hotel-detail-container">
      <button className="back-button" onClick={() => router.push('/hotels')}>
        Back to Hotels List
      </button>
      <h1>{hotel.name}</h1>
      <p>Location: {hotel.location}</p>
      <p>Rating: {hotel.rating}</p>
      <img src={hotel.imageUrl} alt={hotel.name} />
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
    </div>
  );
}