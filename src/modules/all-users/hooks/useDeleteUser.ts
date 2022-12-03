import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { QueryKeysEnum } from "../../../common/models/QueryKeysEnum";
import { queryClient } from "../../../common/query-client/QueryClient";
import userAPI from "../../../services/user/user.api";
import { User } from "../../../services/user/user.types";

const deleteUser = async (id: number) => {
  try {
    const { data } = await userAPI.deleteUser(id);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useDeleteUser = () => {
  const [showAlert] = useIonAlert();

  return useMutation(deleteUser, {
    onSuccess: (_, id) => {
      queryClient.setQueryData(QueryKeysEnum.USERS, (users: any) => {
        return users.filter((user: User) => user.id !== id);
      });
    },
    onError: (error: string) =>
      showAlert({ message: error || "Failed to delete user", buttons: ["ok"] }),
  });
};
