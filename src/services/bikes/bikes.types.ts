export interface Bike {
  id: number;
  color: string;
  rating: number;
  photo: string;
  location: string;
  model: string;
  rented: BikeRent[];
}

export interface BikeRent {
  accountID: number;
  dateFrom: number;
  dateTo?: number;
}

export interface BikeDetails {
  userID: number;
  bikes: RentedBike[];
}

export interface RentedBike {
  dateFrom: number;
  dateTo?: number;
  id: number;
  rated?: number;
}

export interface SetBikeDetails {
  bikeID: number;
  data: BikeRent[];
}
