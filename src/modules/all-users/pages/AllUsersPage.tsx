import React from "react";
import Page from "../../../common/components/Page/Page";
import { withAdmin } from "../../../common/hocs/withAdmin";
import { RouteEnum } from "../../../common/models/RouteEnum";

const AllUsersPage: React.FC = () => {
  return (
    <Page
      withBackButton
      defaultBackButtonHref={RouteEnum.DASHBOARD}
      title="All users"
    >
      All users
    </Page>
  );
};

export default withAdmin(AllUsersPage);
