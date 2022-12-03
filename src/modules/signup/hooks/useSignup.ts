import { useIonAlert } from "@ionic/react";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { useHistory } from "react-router";
import { RouteEnum } from "../../../common/models/RouteEnum";
import authAPI from "../../../services/auth/auth.api";
import { AuthDetails } from "../../../services/auth/auth.types";

const signup = async (details: AuthDetails) => {
  try {
    const { data } = await authAPI.signup(details);

    return data;
  } catch (error) {
    throw (error as AxiosError).message;
  }
};

export const useSignup = () => {
  const [showAlert] = useIonAlert();
  const history = useHistory();

  return useMutation(signup, {
    onSuccess: () => {
      showAlert({
        message:
          "Successfully created new account. Now you can log in using your email and password. ",
        buttons: [
          {
            text: "Ok",
            handler: () => history.push(RouteEnum.LOGIN),
          },
        ],
      });
    },
    onError: (error: string) =>
      showAlert({ message: error || "Failed to sign up", buttons: ["Ok"] }),
  });
};
