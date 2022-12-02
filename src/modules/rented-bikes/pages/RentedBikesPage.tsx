import { IonList } from "@ionic/react";
import React from "react";
import Empty from "../../../common/components/Empty/Empty";
import Loading from "../../../common/components/Loading/Loading";
import Page from "../../../common/components/Page/Page";
import { withUser } from "../../../common/hocs/withUser";
import { useMe } from "../../../common/hooks/useMe";
import { useNow } from "../../../common/hooks/useNow";
import { useBikes } from "../../bikes-list/hooks/useBikes";
import RentedBikeCard from "../components/RentedBikeCard/RentedBikeCard";
import { useCancelBike } from "../hooks/useCancelBike";
import { useRentedBikes } from "../hooks/useRentedBikes";

const RentedBikesPage: React.FC = () => {
  const { data: rentedBikes, isLoading } = useRentedBikes();
  const { data: bikes } = useBikes();
  const { data: user } = useMe();
  const { mutateAsync: cancelBike } = useCancelBike();

  const { now } = useNow();

  return (
    <Page withBackButton title="Rented bikes">
      {isLoading ? (
        <Loading />
      ) : !rentedBikes || !rentedBikes?.length ? (
        <Empty />
      ) : (
        <IonList>
          {rentedBikes.map((rentedBike) => {
            const currentBike = bikes?.find(
              (bike) => bike.id === rentedBike.bikeID
            );

            const isCancellable = rentedBike.dateTo
              ? now < rentedBike.dateTo
              : true;

            const isRateable = Boolean(
              !currentBike?.ratings.find(
                (bikeRating) => bikeRating.userID === user?.id
              ) && !isCancellable
            );

            return currentBike ? (
              <RentedBikeCard
                key={rentedBike.id}
                bike={currentBike}
                rentedBike={rentedBike}
                isCancellable={isCancellable}
                onCancel={() => cancelBike({ rideID: rentedBike.id })}
                isRateable={isRateable}
                onRate={() => {}}
              />
            ) : null;
          })}
        </IonList>
      )}
    </Page>
  );
};

export default withUser(RentedBikesPage);
