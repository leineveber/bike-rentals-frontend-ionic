import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import Flex from "../../../../common/components/Flex/Flex";
import { dateService } from "../../../../services/date/date.service";
import { UserRent } from "../../../../services/user/user.types";
import { useBikes } from "../../../bikes-list/hooks/useBikes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  history: UserRent[] | null | undefined;
}

const HistoryModal: React.FC<Props> = ({ isOpen, onClose, history }) => {
  const { data: bikes } = useBikes();

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>History</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonList>
          {history?.map((item) => (
            <IonItem key={item.id}>
              <div>
                <Flex gap={5}>
                  <IonLabel>Model:</IonLabel>
                  <IonLabel>
                    {bikes?.find((bike) => bike.id === item.bikeID)?.model}
                  </IonLabel>
                </Flex>

                <Flex gap={5}>
                  <IonLabel>Date from:</IonLabel>
                  <IonLabel>{dateService.format(item.dateFrom)}</IonLabel>
                </Flex>

                <Flex gap={5}>
                  <IonLabel>Date to:</IonLabel>
                  <IonLabel>
                    {item.dateTo
                      ? dateService.format(item.dateTo)
                      : "Unlimited"}
                  </IonLabel>
                </Flex>
              </div>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default HistoryModal;
