import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useMe } from "../../../common/hooks/useMe";
import { QueryKeysEnum } from "../../../common/models/QueryKeysEnum";
import { queryClient } from "../../../common/query-client/QueryClient";
import {
  Bike,
  RentBikeDetails,
  RentHistoryItem,
} from "../../../api/bikes/bikes.types";
import bikesAPI from "../../../api/bikes/bikes.api";
import { User } from "../../../api/user/user.types";

const rentBike = async (details: RentBikeDetails) => {
  try {
    const data = await bikesAPI.rentBike(details);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useRentBike = () => {
  const [showAlert] = useIonAlert();

  const { data: user } = useMe();

  return useMutation(rentBike, {
    onSuccess: async (data, { bikeID }) => {
      const newUser = {
        ...user,
        history: user?.history?.length ? [...user.history, data] : [data],
      };

      await queryClient.setQueryData(QueryKeysEnum.USER, () => {
        return newUser;
      });

      await queryClient.setQueryData(QueryKeysEnum.USERS, (users: any) => {
        return users?.length
          ? users.map((dbUser: User) =>
              dbUser.id === user?.id ? newUser : dbUser
            )
          : users;
      });

      await queryClient.setQueryData(QueryKeysEnum.BIKES, (bikes: any) => {
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
