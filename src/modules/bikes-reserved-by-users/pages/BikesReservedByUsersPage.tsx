import React from "react";
import Page from "../../../common/components/Page/Page";
import { withAdmin } from "../../../common/hocs/withAdmin";

const BikesReservedByUsersPage: React.FC = () => {
  return (
    <Page withBackButton title="Bikes, reserved by users">
      Bikes, reserved by users
    </Page>
  );
};

export default withAdmin(BikesReservedByUsersPage);
