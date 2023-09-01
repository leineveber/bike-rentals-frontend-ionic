import { axiosInstance } from "../index.api";
import { AuthDetails, AuthResponse } from "./auth.types";

class AuthAPI {
  signup(details: AuthDetails) {
    return axiosInstance
      .post<AuthResponse>("/register", details)
      .then((res) => res.data);
  }

  login(details: AuthDetails) {
    return axiosInstance
      .post<AuthResponse>("/login", details)
      .then((res) => res.data);
  }

  logout() {
    return new Promise<{ data: string }>((res) => {
      setTimeout(() => {
        res({ data: "Success" });
      }, 0);
    });
  }
}

const authAPI = new AuthAPI();

export default authAPI;
