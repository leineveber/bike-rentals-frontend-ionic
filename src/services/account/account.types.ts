export interface Account {
  id: number;
  email: string;
  password: string;
  role: string;
  history?: AccountRent[];
}

export interface AccountRent {
  id: string;
  bikeID: number;
  dateFrom: number;
  dateTo?: number;
}
