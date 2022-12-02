import { useQuery } from "react-query";
import userAPI from "../../services/user/user.api";
import { QueryKeysEnum } from "../models/QueryKeysEnum";

const getMe = async () => {
  const { data } = await userAPI.getMe();

  return data;
};

export const useMe = () => {
  return useQuery(QueryKeysEnum.USER, getMe);
};
