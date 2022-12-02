import { axiosInstance } from "../base/base.api";
import { User } from "./user.types";

class AccountAPI {
  getMe() {
    return axiosInstance.get<User>("/me");
  }

  getAllAcounts() {
    return axiosInstance.get<User[]>("/users");
  }

  deleteUser(id: number) {
    return axiosInstance.delete(`/users/${id}`);
  }
}

const accountAPI = new AccountAPI();

export default accountAPI;
