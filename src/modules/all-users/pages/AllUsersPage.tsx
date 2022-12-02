import React from "react";
import Page from "../../../common/components/Page/Page";
import { withAdmin } from "../../../common/hocs/withAdmin";

const AllUsersPage: React.FC = () => {
  return (
    <Page withBackButton title="All users">
      All users
    </Page>
  );
};

export default withAdmin(AllUsersPage);
