import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
} from "@ionic/react";
import Flex from "../../../../common/components/Flex/Flex";
import { dateService } from "../../../../services/date/date.service";
import { Bike } from "../../../../api/bikes/bikes.types";
import { UserRent } from "../../../../api/user/user.types";

interface Props {
  bike: Bike;
  rentedBike: UserRent;
  onCancel: () => void;
  isCancellable: boolean;
  onRate: (event: any) => void;
  isRateable: boolean;
}

const RentedBikeCard: React.FC<Props> = ({
  bike,
  rentedBike,
  onCancel,
  isCancellable,
  onRate,
  isRateable,
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{bike.model}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <Flex gap={10}>
          <IonLabel>Date from:</IonLabel>
          <IonLabel>{dateService.format(rentedBike.dateFrom)}</IonLabel>
        </Flex>

        <Flex gap={10}>
          <IonLabel>Date to:</IonLabel>
          <IonLabel>
            {rentedBike.dateTo
              ? dateService.format(rentedBike.dateTo)
              : "Unlimited"}
          </IonLabel>
        </Flex>

        {isCancellable && (
          <IonButton expand="block" onClick={onCancel}>
            Cancel
          </IonButton>
        )}

        {isRateable && (
          <>
            <IonButton expand="block" onClick={onRate}>
              Rate this bike!
            </IonButton>
          </>
        )}
      </IonCardContent>
    </IonCard>
  );
};

export default RentedBikeCard;
