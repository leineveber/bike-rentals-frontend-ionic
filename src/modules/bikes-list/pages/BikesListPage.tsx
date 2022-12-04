import React, { useMemo, useState } from "react";
import { IonList } from "@ionic/react";
import Page from "../../../common/components/Page/Page";
import BikeCard from "../components/BikeCard/BikeCard";
import BikesFilter from "../components/BikesFilter/BikesFilter";
import { useBikes } from "../hooks/useBikes";
import { Bike } from "../../../services/bikes/bikes.types";
import BikeRentModal from "../components/BikeRentModal/BikeRentModal";
import { useMe } from "../../../common/hooks/useMe";
import Loading from "../../../common/components/Loading/Loading";
import { useNow } from "../../../common/hooks/useNow";
import { Filter } from "../models/filter.model";
import { getFilteredBikes } from "../utils/FilterService";
import Empty from "../../../common/components/Empty/Empty";

const filterID = "filter";

export const filterInitialState: Filter = {
  color: [],
  model: [],
  location: "",
  rating: ["", ""],
};

const BikesListPage: React.FC = () => {
  const { data: bikes, isLoading } = useBikes();

  const { data: user } = useMe();

  const [activeBike, setActiveBike] = useState<Bike | null>(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [filter, setFilter] = useState<Filter>(filterInitialState);

  const { now } = useNow();

  // Filters can be debounced if needed

  const filteredBikes = useMemo(
    () => (bikes ? getFilteredBikes(bikes, filter) : null),
    [bikes, filter]
  );

  return (
    <>
      <BikesFilter id={filterID} filter={filter} setFilter={setFilter} />

      <Page id={filterID} title="Bikes" withMenu>
        {isLoading ? (
          <Loading />
        ) : !filteredBikes ? (
          <Empty />
        ) : filteredBikes?.length ? (
          <IonList>
            {filteredBikes.map((bike) => (
              <BikeCard
                key={bike.id}
                now={now}
                userID={user?.id}
                bike={bike}
                onRent={() => {
                  setIsVisibleModal(true);
                  setActiveBike(bike);
                }}
              />
            ))}
          </IonList>
        ) : (
          <Empty additionalText="Please try to change your filter query" />
        )}
      </Page>

      <BikeRentModal
        bike={activeBike}
        isOpen={isVisibleModal}
        onClose={() => {
          setIsVisibleModal(false);
          setActiveBike(null);
        }}
      />
    </>
  );
};

export default BikesListPage;
