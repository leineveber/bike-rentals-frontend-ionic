import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { QueryKeysEnum } from "../../../common/models/QueryKeysEnum";
import userAPI from "../../../services/user/user.api";

const getAllUsers = async () => {
  try {
    const { data } = await userAPI.getAllAcounts();

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useAllUsers = () => {
  const [showAlert] = useIonAlert();

  return useQuery(QueryKeysEnum.USERS, getAllUsers, {
    onError: (error: string) =>
      showAlert({
        message: error || "Failed to get all users",
        buttons: ["Ok"],
      }),
  });
};
