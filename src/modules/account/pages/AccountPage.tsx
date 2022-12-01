import React from "react";
import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router";
import { RouteEnum } from "../../../common/models/RouteEnum";
import DashboardPage from "../../dashboard/pages/DashboardPage";
import LoginPage from "../../login/pages/LoginPage";
import SignupPage from "../../signup/pages/SignupPage";

const AccountPage: React.FC = () => {
  return (
    <IonPage>
      <IonRouterOutlet>
        <Route path={RouteEnum.SIGNUP}>
          <SignupPage />
        </Route>
        <Route path={RouteEnum.LOGIN}>
          <LoginPage />
        </Route>
        <Route path={RouteEnum.DASHBOARD}>
          <DashboardPage />
        </Route>
        <Route exact path={RouteEnum.ACCOUNT}>
          <Redirect to={RouteEnum.SIGNUP} />
        </Route>
      </IonRouterOutlet>
    </IonPage>
  );
};

export default AccountPage;
