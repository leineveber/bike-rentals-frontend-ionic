import React from "react";
import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Redirect, Route } from "react-router";
import DashboardPage from "../../dashboard/pages/DashboardPage";
import LoginPage from "../../login/pages/LoginPage";
import SignupPage from "../../signup/pages/SignupPage";
import RentedBikesPage from "../../rented-bikes/pages/RentedBikesPage";
import BikesReservedByUsersPage from "../../bikes-reserved-by-users/pages/BikesReservedByUsersPage";
import UsersWhoReservedABikePage from "../../users-who-reserved-a-bike/pages/UsersWhoReservedABikePage";
import { useMe } from "../../../common/hooks/useMe";
import { RouteEnum } from "../../../common/models/RouteEnum";
import AllUsersPage from "../../all-users/pages/AllUsersPage";
import Loading from "../../../common/components/Loading/Loading";

const UserPage: React.FC = () => {
  const { data: user } = useMe();

  return (
    <IonPage>
      {user === undefined ? (
        <Loading />
      ) : (
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
          <Route path={RouteEnum.RENTED_BIKES}>
            <RentedBikesPage />
          </Route>
          <Route path={RouteEnum.ALL_USERS}>
            <AllUsersPage />
          </Route>
          <Route path={RouteEnum.BIKES_RESERVED_BY_USERS}>
            <BikesReservedByUsersPage />
          </Route>
          <Route path={RouteEnum.USERS_WHO_RESERVED_A_BIKE}>
            <UsersWhoReservedABikePage />
          </Route>
          <Route exact path={RouteEnum.ACCOUNT}>
            <Redirect to={user ? RouteEnum.DASHBOARD : RouteEnum.SIGNUP} />
          </Route>
        </IonRouterOutlet>
      )}
    </IonPage>
  );
};

export default UserPage;
