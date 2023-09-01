import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { QueryKeysEnum } from "../../../common/models/QueryKeysEnum";
import { queryClient } from "../../../common/query-client/QueryClient";
import bikesAPI from "../../../api/bikes/bikes.api";
import { Bike, RateBikeDetails } from "../../../api/bikes/bikes.types";

const rateBike = async (details: RateBikeDetails) => {
  try {
    const data = await bikesAPI.rateBike(details);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useRateBike = () => {
  const [showAlert] = useIonAlert();

  return useMutation(rateBike, {
    onSuccess: async (data) => {
      await queryClient.setQueryData(QueryKeysEnum.BIKES, (bikes: any) => {
        return bikes.map((bike: Bike) => (bike.id === data.id ? data : bike));
      });
    },
    onError: (error: string) =>
      showAlert({
        message: error || "Failed to rate the bike",
        buttons: ["Ok"],
      }),
  });
};
