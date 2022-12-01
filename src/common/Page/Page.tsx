import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

interface Props {
  title: string;
  withBackButton?: boolean;
  children: React.ReactNode;
}

const Page: React.FC<Props> = ({ title, withBackButton = false, children }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {withBackButton && (
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          )}
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>{children}</IonContent>
    </IonPage>
  );
};

export default Page;
