export interface Bike {
  id: number;
  color: string;
  rating: number;
  ratings: BikeRating[];
  photo: string;
  location: string;
  model: string;
  history?: RentHistoryItem[];
}

export interface BikeRating {
  userID: number;
  rating: number;
}

export interface RentHistoryItem {
  id: string;
  userID: number;
  dateFrom: number;
  dateTo?: number;
  rated: number | null;
}

export interface RentBikeDetails {
  bikeID: number;
  duration: number | string;
}

export type RentBikeResponse = string;

export interface RateBikeDetails {
  bikeID: number;
  rating: number;
}
export type RateBikeResponse = string;

export interface CancelBikeRentDetails {
  rideID: string;
}

export type CancelBikeRentResponse = string;
