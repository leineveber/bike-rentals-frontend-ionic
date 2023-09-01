import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useMe } from "../../../common/hooks/useMe";
import { QueryKeysEnum } from "../../../common/models/QueryKeysEnum";
import { queryClient } from "../../../common/query-client/QueryClient";
import { Bike, CancelBikeRentDetails } from "../../../api/bikes/bikes.types";
import bikesAPI from "../../../api/bikes/bikes.api";
import { User, UserRent } from "../../../api/user/user.types";

const cancelBike = async (details: CancelBikeRentDetails) => {
  try {
    const data = await bikesAPI.cancelBikeRent(details);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useCancelBike = () => {
  const [showAlert] = useIonAlert();
  const { data: user } = useMe();

  return useMutation(cancelBike, {
    onSuccess: async (data) => {
      const newUser = {
        ...user,
        history: user?.history?.map((rentedBike: UserRent) =>
          rentedBike.id === data.id ? data : rentedBike
        ),
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
        return bikes.map((bike: Bike) => ({
          ...bike,
          history: bike.history?.map((historyItem) =>
            historyItem.id === data.id
              ? { ...historyItem, dateTo: data.dateTo }
              : historyItem
          ),
        }));
      });
    },
    onError: (error: string) =>
      showAlert({
        message: error || "Failed to cancel the ride",
        buttons: ["Ok"],
      }),
  });
};
