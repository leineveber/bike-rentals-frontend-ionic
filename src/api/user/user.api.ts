import { axiosInstance } from "../index.api";
import { User } from "./user.types";

class UserAPI {
  getMe() {
    return axiosInstance.get<User>("/me").then((res) => res.data);
  }

  getAllAcounts() {
    return axiosInstance.get<User[]>("/users").then((res) => res.data);
  }

  deleteUser(id: number) {
    return axiosInstance.delete(`/users/${id}`).then((res) => res.data);
  }
}

const userAPI = new UserAPI();

export default userAPI;
