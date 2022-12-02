import { IonButton, IonContent, IonPopover } from "@ionic/react";
import React, { useState } from "react";
import { Rate } from "../../../../common/components/Rate/Rate";
import { Bike } from "../../../../services/bikes/bikes.types";
import { useRateBike } from "../../hooks/useRateBike";

interface Props {
  bike: Bike | null;
  isOpen: boolean;
  onClose: () => void;
}

const RateBikePopover: React.FC<Props> = ({ isOpen, bike, onClose }) => {
  const [rating, setRating] = useState<number | null>(null);

  const { mutateAsync: rateBike } = useRateBike();

  return (
    <IonPopover
      isOpen={isOpen}
      onDidDismiss={() => {
        onClose();
        setRating(null);
      }}
    >
      <IonContent className="ion-padding">
        <Rate value={rating} onChange={setRating} />

        <IonButton
          className="ion-margin-top"
          expand="block"
          disabled={!rating}
          onClick={() => {
            if (bike && rating) {
              rateBike({ bikeID: bike.id, rating });
              setRating(null);
              onClose();
            }
          }}
        >
          Rate!
        </IonButton>
      </IonContent>
    </IonPopover>
  );
};

export default RateBikePopover;
