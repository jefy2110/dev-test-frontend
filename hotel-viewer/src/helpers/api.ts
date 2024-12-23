import axios from 'axios';
import { Hotel } from '@/types/types';

// retrieves list of hotels from backend
export async function getHotels(): Promise<Hotel[]> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/hotels/`); 
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch hotels');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}
// retrieves details of a specific hotel by id from backend
export async function getHotelById(id: string): Promise<Hotel> {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/hotels/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch hotel details');
    } else {
      throw new Error('An unknown error occurred');
    }
  }
}