import React from "react";
import { IonButton } from "@ionic/react";
import Page from "../../../common/components/Page/Page";
import { useMe } from "../../../common/hooks/useMe";
import { useLogout } from "../hooks/useLogout";
import { withUser } from "../../../common/hocs/withUser";
import { RouteEnum } from "../../../common/models/RouteEnum";

const DashboardPage: React.FC = () => {
  const { data: user } = useMe();

  const { mutate: logout } = useLogout();

  return (
    <Page withPadding title="Dashboard">
      <IonButton
        routerLink={RouteEnum.RENTED_BIKES}
        fill="outline"
        className="ion-margin-bottom"
        expand="block"
      >
        Rented bikes
      </IonButton>

      {user?.role === "admin" && (
        <>
          <IonButton
            routerLink={RouteEnum.ALL_USERS}
            fill="outline"
            className="ion-margin-bottom"
            expand="block"
          >
            All users
          </IonButton>

          <IonButton
            routerLink={RouteEnum.USERS_WHO_RESERVED_A_BIKE}
            fill="outline"
            className="ion-margin-bottom"
            expand="block"
          >
            Users, who reserved a bike
          </IonButton>

          <IonButton
            routerLink={RouteEnum.BIKES_RESERVED_BY_USERS}
            fill="outline"
            className="ion-margin-bottom"
            expand="block"
          >
            Bikes, reserved by users
          </IonButton>
        </>
      )}

      <IonButton expand="block" onClick={() => logout()}>
        Log out
      </IonButton>
    </Page>
  );
};

export default withUser(DashboardPage);
