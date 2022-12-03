import React from "react";
import Page from "../../../common/components/Page/Page";
import { withAdmin } from "../../../common/hocs/withAdmin";
import { RouteEnum } from "../../../common/models/RouteEnum";

const UsersWhoReservedABikePage: React.FC = () => {
  return (
    <Page
      withBackButton
      defaultBackButtonHref={RouteEnum.DASHBOARD}
      title="Users, who reserved a bike"
    >
      Users, who reserved a bike
    </Page>
  );
};

export default withAdmin(UsersWhoReservedABikePage);
