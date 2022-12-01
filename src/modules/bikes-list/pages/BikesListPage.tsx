import React from "react";
import { IonList } from "@ionic/react";
import Page from "../../../common/components/Page/Page";
import BikeCard from "../components/BikeCard/BikeCard";
import BikesFilter from "../components/BikesFilter/BikesFilter";
import { useBikes } from "../hooks/useBikes";

const filterID = "filter";

const BikesListPage: React.FC = () => {
  const { data: bikes } = useBikes();

  return (
    <>
      <BikesFilter id={filterID} />

      <Page id={filterID} title="Bikes" withMenu>
        <IonList>
          {bikes?.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </IonList>
      </Page>
    </>
  );
};

export default BikesListPage;
