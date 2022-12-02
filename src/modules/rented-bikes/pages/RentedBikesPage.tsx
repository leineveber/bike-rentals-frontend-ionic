import React from "react";
import Page from "../../../common/components/Page/Page";
import { withUser } from "../../../common/hocs/withUser";

const RentedBikesPage: React.FC = () => {
  return (
    <Page withBackButton title="Rented bikes">
      Rented bikes
    </Page>
  );
};

export default withUser(RentedBikesPage);
