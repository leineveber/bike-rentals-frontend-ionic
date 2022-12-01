import { Preferences } from "@capacitor/preferences";
import axios from "axios";
import { QueryKeysEnum } from "../../common/models/query-keys.enum";
import { StorageKeysEnum } from "../../common/models/storage-keys.enum";
import { queryClient } from "../../common/query-client/query-client";

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
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
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

    return Promise.reject(e);
  }
);
