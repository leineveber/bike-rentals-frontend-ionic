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
  withPadding?: boolean;
  children: React.ReactNode;
}

const Page: React.FC<Props> = ({
  id,
  title,
  withBackButton = false,
  withMenu = false,
  withPadding = false,
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
      <IonContent className={withPadding ? "ion-padding" : ""}>
        {children}
      </IonContent>
    </IonPage>
  );
};

export default Page;
