import { axiosInstance } from "../index.api";
import {
  Bike,
  CancelBikeRentDetails,
  CancelBikeRentResponse,
  RateBikeDetails,
  RateBikeResponse,
  RentBikeDetails,
  RentBikeResponse,
} from "./bikes.types";

class BikesAPI {
  getBikes() {
    return axiosInstance.get<Bike[]>("/bikes").then((res) => res.data);
  }

  rentBike(details: RentBikeDetails) {
    return axiosInstance
      .post<RentBikeResponse>("/rent", details)
      .then((res) => res.data);
  }

  cancelBikeRent(details: CancelBikeRentDetails) {
    return axiosInstance
      .post<CancelBikeRentResponse>("/cancel", details)
      .then((res) => res.data);
  }

  rateBike(details: RateBikeDetails) {
    return axiosInstance
      .post<RateBikeResponse>("rate", details)
      .then((res) => res.data);
  }
}

const bikesAPI = new BikesAPI();

export default bikesAPI;
