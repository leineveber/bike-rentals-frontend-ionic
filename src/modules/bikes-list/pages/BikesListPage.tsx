import React, { useState } from "react";
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

  console.log(filter);

  const filterByColor = (array: Bike[]) =>
    array.filter((bike) =>
      filter.color.some((color) =>
        bike.color.toLowerCase().includes(color.toLowerCase())
      )
    );

  const filterByModel = (array: Bike[]) =>
    array.filter((bike) =>
      filter.model.some((model) =>
        bike.model.toLowerCase().includes(model.toLowerCase())
      )
    );

  const filterByLocation = (array: Bike[]) =>
    array.filter((bike) =>
      bike.location.toLowerCase().includes(filter.location.toLowerCase())
    );

  const filterByRating = (array: Bike[]) =>
    array.filter(
      (bike) =>
        parseInt(filter.rating[0], 10) <= bike.rating &&
        parseInt(filter.rating[1], 10) >= bike.rating
    );

  const getFilteredBikes = () => {
    if (bikes) {
      let result: Bike[] = bikes;

      result = filter.color.length ? filterByColor(result) : result;
      result = filter.model.length ? filterByModel(result) : result;
      result = filter.location ? filterByLocation(result) : result;
      result =
        filter.rating[0] && filter.rating[1] ? filterByRating(result) : result;

      return result;
    }

    return [];
  };

  const filteredBikes = getFilteredBikes();

  return (
    <>
      <BikesFilter id={filterID} filter={filter} setFilter={setFilter} />

      <Page id={filterID} title="Bikes" withMenu>
        {isLoading ? (
          <Loading />
        ) : (
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
