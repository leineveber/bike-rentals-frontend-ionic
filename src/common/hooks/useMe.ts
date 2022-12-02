import { AxiosError } from "axios";
import { useQuery } from "react-query";
import userAPI from "../../services/user/user.api";
import { QueryKeysEnum } from "../models/QueryKeysEnum";

const getMe = async () => {
  try {
    const { data } = await userAPI.getMe();

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useMe = () => {
  return useQuery(QueryKeysEnum.USER, getMe);
};
