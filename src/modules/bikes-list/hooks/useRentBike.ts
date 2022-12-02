import { useIonAlert, useIonToast } from "@ionic/react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useMe } from "../../../common/hooks/useMe";
import bikesAPI from "../../../services/bikes/bikes.api";
import { RentBikeDetails } from "../../../services/bikes/bikes.types";
import { useBikes } from "./useBikes";

const rentBike = async (details: RentBikeDetails) => {
  try {
    const { data } = await bikesAPI.rentBike(details);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useRentBike = () => {
  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();

  const { refetch: getMe } = useMe();
  const { refetch: getBikes } = useBikes();

  return useMutation(rentBike, {
    onSuccess: (data) => {
      getMe();
      getBikes();
      showToast({ message: data, duration: 1500, position: "bottom" });
    },
    onError: (error: string) => showAlert({ message: error, buttons: ["Ok"] }),
  });
};
