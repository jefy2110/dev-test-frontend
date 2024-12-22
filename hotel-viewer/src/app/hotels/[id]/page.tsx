'use client';
import React, { useEffect, useState } from 'react';
import { getHotelById } from '@/helpers/api';
import { Hotel } from '@/types/types';
import { useParams, useRouter } from 'next/navigation';
import '@/styles/hotels[id].css';
import fallbackHotels from '@/data/hotels.json'; 

export default function HotelDetail() {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        if (!id) throw new Error('No hotel ID provided');
        const data = await getHotelById(id);
        setHotel(data);
      } catch (err) {
        console.error('Error fetching hotel details from API:', err);
        const fallbackHotel = fallbackHotels.find((hotel) => hotel.id === Number(id));
        if (fallbackHotel) {
          setHotel(fallbackHotel); 
          setError('Unable to connect to the backend. Loaded local data instead.');
        } else {
          setError('Hotel not found. Redirecting... ');
          setTimeout(() => {
            router.push('/hotels');
          }, 2000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  if (loading) return <p className="message">Loading hotel details...</p>;
  if (error) console.warn(error);

  if (!hotel) return <p className="message">Hotel not found.</p>;

  return (
    <div className="hotel-detail-container">
      <button className="back-button" onClick={() => router.push('/hotels')}>
        Back to Hotels List
      </button>
      <h1>{hotel.name}</h1>
      <img
        src={hotel.imageUrl}
        alt={hotel.name}
        width={1000}
        height={1000}
        onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
      />
      <div className="hotel-details-grid">
        <div className="detail-pill">
          <strong>Location:</strong> {hotel.location}
        </div>
        <div className="detail-pill">
          <strong>Rating:</strong> {hotel.rating}
        </div>
        <div className="detail-pill">
          <strong>Dates of Travel:</strong> {hotel.datesOfTravel.join(', ')}
        </div>
        <div className="detail-pill">
          <strong>Board Basis:</strong> {hotel.boardBasis}
        </div>
      </div>
      <div className="hotel-rooms">
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
    </div>
  );
}