import React, { useEffect } from "react";
import { useHistory } from "react-router";
import Page from "../../../common/components/Page/Page";
import { useMe } from "../../../common/hooks/useMe";
import { RouteEnum } from "../../../common/models/RouteEnum";

const DashboardPage: React.FC = () => {
  const { data: user } = useMe();

  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push(RouteEnum.SIGNUP);
    }
  }, [user, history]);

  return <Page title="Dashboard">Dashboard</Page>;
};

export default DashboardPage;
