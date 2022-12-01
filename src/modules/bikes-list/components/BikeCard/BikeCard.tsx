import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
} from "@ionic/react";
import { Bike } from "../../../../services/bikes/bikes.types";
import Rating from "../../../../common/components/Rating/Rating";
import Flex from "../../../../common/components/Flex/Flex";

interface Props {
  bike: Bike;
}

const BikeCard: React.FC<Props> = ({ bike }) => {
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
          <IonButton expand="block">Rent</IonButton>
        </Flex>
      </IonCardContent>
    </IonCard>
  );
};

export default BikeCard;
