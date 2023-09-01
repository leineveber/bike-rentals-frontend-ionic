import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { QueryKeysEnum } from "../models/QueryKeysEnum";
import { queryClient } from "../query-client/QueryClient";
import userAPI from "../../api/user/user.api";

const getMe = async () => {
  try {
    const data = await userAPI.getMe();

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useMe = () => {
  return useQuery(QueryKeysEnum.USER, getMe, {
    onError: async () => {
      await queryClient.setQueryData(QueryKeysEnum.USER, () => null);
    },
  });
};
