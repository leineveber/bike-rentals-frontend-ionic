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

const routes = [
  {
    path: RouteEnum.SIGNUP,
    Component: SignupPage,
  },
  {
    path: RouteEnum.LOGIN,
    Component: LoginPage,
  },
  {
    path: RouteEnum.DASHBOARD,
    Component: DashboardPage,
  },
  {
    path: RouteEnum.RENTED_BIKES,
    Component: RentedBikesPage,
  },
  {
    path: RouteEnum.ALL_USERS,
    Component: AllUsersPage,
  },
  {
    path: RouteEnum.BIKES_RESERVED_BY_USERS,
    Component: BikesReservedByUsersPage,
  },
  {
    path: RouteEnum.USERS_WHO_RESERVED_A_BIKE,
    Component: UsersWhoReservedABikePage,
  },
];

const UserPage: React.FC = () => {
  const { data: user } = useMe();

  return (
    <IonPage>
      {!user ? (
        <Loading />
      ) : (
        <IonRouterOutlet>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path}>
              <Component />
            </Route>
          ))}
          <Route exact path={RouteEnum.ACCOUNT}>
            <Redirect to={user ? RouteEnum.DASHBOARD : RouteEnum.SIGNUP} />
          </Route>
        </IonRouterOutlet>
      )}
    </IonPage>
  );
};

export default UserPage;
