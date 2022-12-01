import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { QueryKeysEnum } from "../../../common/models/QueryKeysEnum";
import bikesAPI from "../../../services/bikes/bikes.api";

const getBikes = async () => {
  try {
    const { data } = await bikesAPI.getBikes();

    return data;
  } catch (error) {
    throw (error as AxiosError).message || "Failed to get bikes";
  }
};

export const useBikes = () => {
  const [showAlert] = useIonAlert();

  return useQuery(QueryKeysEnum.BIKES, getBikes, {
    onError: (error: string) => showAlert({ message: error, buttons: ["Ok"] }),
  });
};
