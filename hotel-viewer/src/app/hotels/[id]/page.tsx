'use client';
import React, { useEffect, useState } from 'react';
import { getHotelById } from '@/helpers/api';
import { Hotel } from '@/types/types';
import { useParams, useRouter } from 'next/navigation';
import '@/styles/hotels[id].css';
import fallbackHotels from '@/data/hotels.json';
import HotelCard from '@/components/HotelCard/HotelCard'; 

export default function HotelDetail() {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams() as { id: string };
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
          setError('Hotel not found.');
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
      <ul className="hotels-list">
        <HotelCard hotel={hotel} variant="detail" />
      </ul>
    </div>
  );
}
