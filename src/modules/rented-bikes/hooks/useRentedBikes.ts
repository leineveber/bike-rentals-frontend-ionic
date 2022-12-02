import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { QueryKeysEnum } from "../../../common/models/QueryKeysEnum";
import bikesAPI from "../../../services/bikes/bikes.api";

const getRentedBikes = async () => {
  try {
    const { data } = await bikesAPI.getRentedBikes();

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useRentedBikes = () => {
  const [showAlert] = useIonAlert();

  return useQuery(QueryKeysEnum.RENTED_BIKES, getRentedBikes, {
    onError: (error: string) => showAlert({ message: error, buttons: ["Ok"] }),
  });
};
