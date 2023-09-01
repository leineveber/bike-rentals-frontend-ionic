import { IonButton, IonContent, IonPopover } from "@ionic/react";
import React, { useState } from "react";
import { Rate } from "../../../../common/components/Rate/Rate";
import { useRateBike } from "../../hooks/useRateBike";
import { Bike } from "../../../../api/bikes/bikes.types";

interface Props {
  bike: Bike | null;
  isOpen: boolean;
  onClose: () => void;
}

const RateBikePopover = React.forwardRef<HTMLIonPopoverElement, Props>(
  ({ isOpen, bike, onClose }, ref) => {
    const [rating, setRating] = useState<number | null>(null);

    const { mutateAsync: rateBike } = useRateBike();

    return (
      <IonPopover
        ref={ref}
        isOpen={isOpen}
        onDidDismiss={() => {
          setRating(null);
          onClose();
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
  }
);

export default RateBikePopover;
