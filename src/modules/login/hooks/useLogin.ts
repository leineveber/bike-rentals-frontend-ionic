import { Preferences } from "@capacitor/preferences";
import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { QueryKeysEnum } from "../../../common/models/QueryKeysEnum";
import { RouteEnum } from "../../../common/models/RouteEnum";
import { StorageKeysEnum } from "../../../common/models/StorageKeysEnum";
import { queryClient } from "../../../common/query-client/QueryClient";
import { AuthDetails } from "../../../api/auth/auth.types";
import authAPI from "../../../api/auth/auth.api";

const login = async (details: AuthDetails) => {
  try {
    const data = await authAPI.login(details);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useLogin = () => {
  const [showAlert] = useIonAlert();
  const history = useHistory();

  return useMutation(login, {
    onSuccess: async (data) => {
      await Preferences.set({
        key: StorageKeysEnum.ACCESS_TOKEN,
        value: data.accessToken,
      });

      await queryClient.setQueryData(QueryKeysEnum.USER, data.user);

      history.push(RouteEnum.DASHBOARD);
    },
    onError: (error: string) =>
      showAlert({ message: error || "Failed to log in", buttons: ["Ok"] }),
  });
};
