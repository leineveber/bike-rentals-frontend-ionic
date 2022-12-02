import { IonText } from "@ionic/react";
import React from "react";
import Center from "../Center/Center";

const Empty: React.FC = () => {
  return (
    <Center innerClassName="ion-text-center">
      <IonText>We are sorry, but there is nothing here... :(</IonText>
    </Center>
  );
};

export default Empty;
