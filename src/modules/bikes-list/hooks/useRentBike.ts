import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useMe } from "../../../common/hooks/useMe";
import { QueryKeysEnum } from "../../../common/models/QueryKeysEnum";
import { queryClient } from "../../../common/query-client/QueryClient";
import bikesAPI from "../../../services/bikes/bikes.api";
import {
  Bike,
  RentBikeDetails,
  RentHistoryItem,
} from "../../../services/bikes/bikes.types";

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

  const { data: user } = useMe();

  return useMutation(rentBike, {
    onSuccess: (data, { bikeID }) => {
      queryClient.setQueryData(QueryKeysEnum.USER, (user: any) => {
        return {
          ...user,
          history: user?.history?.length ? [...user.history, data] : [data],
        };
      });

      queryClient.setQueryData(QueryKeysEnum.BIKES, (bikes: any) => {
        const newBikeRent: RentHistoryItem = {
          id: data.id,
          userID: user!.id,
          dateFrom: data.dateFrom,
        };
        if (data?.dateTo) {
          newBikeRent.dateTo = data.dateTo;
        }
        return bikes.map((bike: Bike) =>
          bike.id === bikeID
            ? {
                ...bike,
                history: bike?.history?.length
                  ? [...bike.history, newBikeRent]
                  : [newBikeRent],
              }
            : bike
        );
      });
    },
    onError: (error: string) =>
      showAlert({
        message: error || "Failed to rent the bike",
        buttons: ["Ok"],
      }),
  });
};
