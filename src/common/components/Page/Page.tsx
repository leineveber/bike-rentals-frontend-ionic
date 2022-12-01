import React from "react";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

interface Props {
  id?: string;
  title: string;
  withBackButton?: boolean;
  withMenu?: boolean;
  children: React.ReactNode;
}

const Page: React.FC<Props> = ({
  id,
  title,
  withBackButton = false,
  withMenu = false,
  children,
}) => {
  return (
    <IonPage id={id}>
      <IonHeader>
        <IonToolbar>
          {withBackButton && (
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
          )}
          {withMenu && (
            <IonButtons slot="end">
              <IonMenuButton />
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
