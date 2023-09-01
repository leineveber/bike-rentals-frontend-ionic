import { Preferences } from "@capacitor/preferences";
import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { QueryKeysEnum } from "../../../common/models/QueryKeysEnum";
import { StorageKeysEnum } from "../../../common/models/StorageKeysEnum";
import { queryClient } from "../../../common/query-client/QueryClient";
import authAPI from "../../../api/auth/auth.api";

const logout = async () => {
  try {
    const data = await authAPI.logout();

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useLogout = () => {
  const [showAlert] = useIonAlert();

  return useMutation(logout, {
    onSuccess: async () => {
      await Preferences.remove({ key: StorageKeysEnum.ACCESS_TOKEN });

      await queryClient.setQueryData(QueryKeysEnum.USER, () => null);
    },
    onError: (error: string) =>
      showAlert({ message: error || "Failed to log out", buttons: ["Ok"] }),
  });
};
