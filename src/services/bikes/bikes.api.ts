import { axiosInstance } from "../base/base.api";
import { Bike, RentBikeDetails, RentBikeResponse } from "./bikes.types";

class BikesAPI {
  getBikes() {
    return axiosInstance.get<Bike[]>("/bikes");
  }

  rentBike(details: RentBikeDetails) {
    return axiosInstance.post<RentBikeResponse>("/rent", details);
  }

  // cancelBikeRent({ userID, bikes }: BikeDetails) {
  //   return axiosInstance.patch<Account>(`/users/${userID}`, {
  //     rentedBikes: bikes,
  //   });
  // }

  // rateBike({ userID, bikes }: BikeDetails) {
  //   return axiosInstance.patch<Account>(`/users/${userID}`, {
  //     rentedBikes: bikes,
  //   });
  // }
}

const bikesAPI = new BikesAPI();

export default bikesAPI;
