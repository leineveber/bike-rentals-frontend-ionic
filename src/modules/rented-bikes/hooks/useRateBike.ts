import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import bikesAPI from "../../../services/bikes/bikes.api";
import { RateBikeDetails } from "../../../services/bikes/bikes.types";
import { useBikes } from "../../bikes-list/hooks/useBikes";

const rateBike = async (details: RateBikeDetails) => {
  try {
    const { data } = await bikesAPI.rateBike(details);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useRateBike = () => {
  const [showAlert] = useIonAlert();

  const { refetch: getBikes } = useBikes();

  return useMutation(rateBike, {
    onSuccess: (data) => {
      showAlert({ message: data, buttons: ["Ok"] });
      getBikes();
    },
    onError: (error: string) => showAlert({ message: error, buttons: ["Ok"] }),
  });
};
