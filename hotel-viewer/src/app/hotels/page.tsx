'use client';
import React, { useEffect, useState } from 'react';
import { getHotels } from '@/helpers/api';
import { Hotel } from '@/types/types';
import '@/styles/hotels.css';
import fallbackHotels from '@/data/hotels.json';
import HotelCard from '@/components/HotelCard/HotelCard'; 

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
        setHotels(fallbackHotels);
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
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </ul>
    </div>
  );
}
