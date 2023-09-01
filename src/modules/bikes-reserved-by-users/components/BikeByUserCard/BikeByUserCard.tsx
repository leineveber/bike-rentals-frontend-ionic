import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { Bike } from "../../../../api/bikes/bikes.types";

interface Props {
  bike: Bike;
  onHistory: () => void;
}

const BikeByUserCard: React.FC<Props> = ({ bike, onHistory }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{bike.model}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonButton expand="block" onClick={onHistory}>
          History
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default BikeByUserCard;
