import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useMe } from "../../../common/hooks/useMe";
import bikesAPI from "../../../services/bikes/bikes.api";
import { CancelBikeRentDetails } from "../../../services/bikes/bikes.types";
import { useBikes } from "../../bikes-list/hooks/useBikes";

const cancelBike = async (details: CancelBikeRentDetails) => {
  try {
    const { data } = await bikesAPI.cancelBikeRent(details);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useCancelBike = () => {
  const [showAlert] = useIonAlert();

  const { refetch: getMe } = useMe();
  const { refetch: getBikes } = useBikes();

  return useMutation(cancelBike, {
    onSuccess: () => {
      getMe();
      getBikes();
    },
    onError: (error: string) => showAlert({ message: error, buttons: ["Ok"] }),
  });
};
