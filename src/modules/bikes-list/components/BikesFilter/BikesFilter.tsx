import React from "react";
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

interface Props {
  id: string;
}

const BikesFilter: React.FC<Props> = ({ id }) => {
  return (
    <IonMenu contentId={id}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">This is the filter.</IonContent>
    </IonMenu>
  );
};

export default BikesFilter;
