import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import Center from "../../../../common/components/Center/Center";
import { useRentBike } from "../../hooks/useRentBike";
import { Bike } from "../../../../api/bikes/bikes.types";

const options = [
  {
    value: 1800000,
    label: "30 minutes",
  },
  {
    value: 3600000,
    label: "1 hour",
  },
  {
    value: 7200000,
    label: "2 hours",
  },
  {
    value: "unlimited",
    label: "Unlimited",
  },
];

interface Props {
  bike: Bike | null;
  isOpen: boolean;
  onClose: () => void;
}

const BikeRentModal: React.FC<Props> = ({ bike, isOpen, onClose }) => {
  const { mutateAsync: rentBike } = useRentBike();

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Duration</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Center>
          {bike &&
            options.map((option, i, array) => (
              <IonButton
                key={i}
                expand="block"
                fill={i === array.length - 1 ? "solid" : "outline"}
                onClick={() => {
                  rentBike({ bikeID: bike.id, duration: option.value });
                  onClose();
                }}
              >
                {option.label}
              </IonButton>
            ))}
        </Center>
      </IonContent>
    </IonModal>
  );
};

export default BikeRentModal;
