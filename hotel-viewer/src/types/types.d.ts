export type Room = {
  roomType: string;
  amount: number;
};

export type Hotel = {
  id: number;
  name: string;
  location: string;
  rating: number;
  imageUrl: string;
  datesOfTravel: string[];
  boardBasis: string;
  rooms: Room[];
};
