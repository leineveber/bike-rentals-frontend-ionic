import React from "react";
import Page from "../../../common/components/Page/Page";
import { withAdmin } from "../../../common/hocs/withAdmin";

const UsersWhoReservedABikePage: React.FC = () => {
  return (
    <Page withBackButton title="Users, who reserved a bike">
      Users, who reserved a bike
    </Page>
  );
};

export default withAdmin(UsersWhoReservedABikePage);
