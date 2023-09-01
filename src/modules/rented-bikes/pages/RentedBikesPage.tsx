import { IonList } from "@ionic/react";
import React, { useMemo, useRef, useState } from "react";
import Empty from "../../../common/components/Empty/Empty";
import Loading from "../../../common/components/Loading/Loading";
import Page from "../../../common/components/Page/Page";
import { withUser } from "../../../common/hocs/withUser";
import { useMe } from "../../../common/hooks/useMe";
import { useNow } from "../../../common/hooks/useNow";
import { RouteEnum } from "../../../common/models/RouteEnum";
import { useBikes } from "../../bikes-list/hooks/useBikes";
import RateBikePopover from "../components/RateBikePopover/RateBikePopover";
import RentedBikeCard from "../components/RentedBikeCard/RentedBikeCard";
import { useCancelBike } from "../hooks/useCancelBike";
import { Bike } from "../../../api/bikes/bikes.types";

const RentedBikesPage: React.FC = () => {
  const { data: bikes } = useBikes();
  const { data: user, isLoading } = useMe();
  const { mutateAsync: cancelBike } = useCancelBike();

  const [isVisiblePopover, setIsVisiblePopover] = useState(false);
  const [activeBike, setActiveBike] = useState<Bike | null>(null);

  const { now } = useNow();

  const popoverRef = useRef<HTMLIonPopoverElement>(null);

  const rentedBikes = useMemo(
    () => [...(user?.history || [])].reverse(),
    [user?.history]
  );

  const bikesMemo = useMemo(
    () =>
      rentedBikes.map((rentedBike) => {
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
            onRate={(event) => {
              popoverRef.current!.event = event;
              setActiveBike(currentBike);
              setIsVisiblePopover(true);
            }}
          />
        ) : null;
      }),
    [bikes, cancelBike, now, rentedBikes, user?.id]
  );

  return (
    <>
      <Page
        withBackButton
        defaultBackButtonHref={RouteEnum.DASHBOARD}
        title="Rented bikes"
      >
        {isLoading ? (
          <Loading />
        ) : !rentedBikes || !rentedBikes?.length ? (
          <Empty />
        ) : (
          <IonList>{bikesMemo}</IonList>
        )}
      </Page>

      <RateBikePopover
        ref={popoverRef}
        bike={activeBike}
        isOpen={isVisiblePopover}
        onClose={() => {
          setIsVisiblePopover(false);
          setActiveBike(null);
        }}
      />
    </>
  );
};

export default withUser(RentedBikesPage);
