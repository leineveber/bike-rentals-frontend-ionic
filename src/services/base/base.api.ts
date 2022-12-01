import { Preferences } from "@capacitor/preferences";
import axios from "axios";
import { QueryKeysEnum } from "../../common/models/QueryKeysEnum";
import { StorageKeysEnum } from "../../common/models/StorageKeysEnum";
import { queryClient } from "../../common/query-client/QueryClient";

const BASE_URL = "http://192.168.0.102:4444";

export const axiosInstance = axios.create({ baseURL: BASE_URL });

axiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await Preferences.get({
    key: StorageKeysEnum.ACCESS_TOKEN,
  });

  return {
    ...config,
    headers: {
      ...config.headers,
      "Content-Type": "application/json",
      Authorization: accessToken ? `Bearer ${accessToken.value}` : "",
    },
  };
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (e) => {
    const error = JSON.parse(JSON.stringify(e));

    if (error.status === 401) {
      await Preferences.remove({ key: StorageKeysEnum.ACCESS_TOKEN });
      await queryClient.setQueryData(QueryKeysEnum.ACCOUNT, undefined);
    }

    const responseError = {
      ...error,
      message: e.response.data,
    };

    return Promise.reject(responseError);
  }
);
