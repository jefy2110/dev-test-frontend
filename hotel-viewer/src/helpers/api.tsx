import axios from 'axios';
import { Hotel } from '@/types/types';

export async function getHotels(): Promise<Hotel[]> {
  try {
    const response = await axios.get(`http://localhost:5054/api/hotels/`); 
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch hotels');
  }
}

export async function getHotelById(id: string): Promise<Hotel> {
    try {
      const response = await axios.get(`http://localhost:5054/api/hotels/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch hotel details');
    }
  }