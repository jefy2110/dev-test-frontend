import { redirect } from 'next/navigation';

//Redirects immediately to hotelsList as there is no home page or login. If developed into a more complete app this would be used appropriately. 
export default function Home() {
  redirect('/hotels');
  return null;
}

