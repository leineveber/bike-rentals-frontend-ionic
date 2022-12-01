import { useQuery } from "react-query";
import accountAPI from "../../services/account/account.api";
import { QueryKeysEnum } from "../models/QueryKeysEnum";

const getMe = async () => {
  const { data } = await accountAPI.getMe();

  return data;
};

export const useMe = () => {
  return useQuery(QueryKeysEnum.ACCOUNT, getMe);
};
