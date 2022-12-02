export interface Bike {
  id: number;
  color: string;
  rating: number;
  photo: string;
  location: string;
  model: string;
  history?: Rent[];
}

export interface Rent {
  id: string;
  userID: number;
  dateFrom: number;
  dateTo?: number;
}

export interface RentBikeDetails {
  bikeID: number;
  duration: number | string;
}

export type RentBikeResponse = string;
