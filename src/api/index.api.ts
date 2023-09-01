import { Preferences } from "@capacitor/preferences";
import axios from "axios";
import { StorageKeysEnum } from "../common/models/StorageKeysEnum";
import { QueryKeysEnum } from "../common/models/QueryKeysEnum";
import { queryClient } from "../common/query-client/QueryClient";

const BASE_URL = "https://bike-rentals-backend.glitch.me"; // For testing purposes, IRL should be in .env

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
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : "",
    },
  } as any;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (e) => {
    const error = JSON.parse(JSON.stringify(e));

    if (error.status === 401) {
      await Preferences.remove({ key: StorageKeysEnum.ACCESS_TOKEN });
      await queryClient.setQueryData(QueryKeysEnum.USER, null);
    }

    const responseError = {
      ...error,
      message: e.response.data,
    };

    return Promise.reject(responseError);
  }
);
