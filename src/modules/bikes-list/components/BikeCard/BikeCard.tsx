import React, { useMemo } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
} from "@ionic/react";
import Rating from "../../../../common/components/Rating/Rating";
import Flex from "../../../../common/components/Flex/Flex";
import { Bike } from "../../../../api/bikes/bikes.types";

interface Props {
  bike: Bike;
  onRent: () => void;
  now: number;
  userID: number | undefined;
}

const BikeCard: React.FC<Props> = ({ bike, onRent, userID, now }) => {
  const isBikeAvailable = useMemo(
    () =>
      bike.history
        ? bike.history.every(
            (rent) => now < rent.dateFrom || (rent.dateTo && now >= rent.dateTo)
          )
        : true,
    [bike.history, now]
  );

  const isRentedByMe = useMemo(
    () =>
      bike.history
        ? bike.history.some(
            (rent) =>
              now >= rent.dateFrom &&
              (rent.dateTo ? now < rent.dateTo : true) &&
              userID &&
              rent.userID === userID
          )
        : false,
    [bike.history, now, userID]
  );

  const isDisabled = useMemo(
    () => !isBikeAvailable || !userID || isRentedByMe,
    [isBikeAvailable, userID, isRentedByMe]
  );

  return (
    <IonCard>
      <IonImg src={bike.photo} alt={bike.model} />
      <IonCardHeader>
        <IonCardSubtitle>{bike.location}</IonCardSubtitle>

        <IonCardTitle>
          {bike.model} ({bike.color})
        </IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <Flex direction="column" gap={10}>
          <Rating value={bike.rating} />
          <IonButton disabled={isDisabled} expand="block" onClick={onRent}>
            {!userID
              ? "Please log in to rent it"
              : isRentedByMe
              ? "Rented"
              : !isBikeAvailable
              ? "Not available"
              : "Rent now"}
          </IonButton>
        </Flex>
      </IonCardContent>
    </IonCard>
  );
};

export default BikeCard;
