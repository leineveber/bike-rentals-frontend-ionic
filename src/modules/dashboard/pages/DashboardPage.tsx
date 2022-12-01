import { IonButton } from "@ionic/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Page from "../../../common/components/Page/Page";
import { useMe } from "../../../common/hooks/useMe";
import { RouteEnum } from "../../../common/models/RouteEnum";
import { useLogout } from "../hooks/useLogout";

const DashboardPage: React.FC = () => {
  const { data: user } = useMe();

  const { mutate: logout } = useLogout();

  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push(RouteEnum.SIGNUP);
    }
  }, [user, history]);

  return (
    <Page withPadding title="Dashboard">
      <IonButton expand="block" onClick={() => logout()}>
        Log out
      </IonButton>
    </Page>
  );
};

export default DashboardPage;
