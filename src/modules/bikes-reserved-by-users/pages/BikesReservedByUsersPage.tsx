import React from "react";
import Page from "../../../common/components/Page/Page";
import { withAdmin } from "../../../common/hocs/withAdmin";
import { RouteEnum } from "../../../common/models/RouteEnum";

const BikesReservedByUsersPage: React.FC = () => {
  return (
    <Page
      withBackButton
      defaultBackButtonHref={RouteEnum.DASHBOARD}
      title="Bikes, reserved by users"
    >
      Bikes, reserved by users
    </Page>
  );
};

export default withAdmin(BikesReservedByUsersPage);
