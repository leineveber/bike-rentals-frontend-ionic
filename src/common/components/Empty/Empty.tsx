import { IonText } from "@ionic/react";
import React from "react";
import Center from "../Center/Center";
import Flex from "../Flex/Flex";

interface Props {
  additionalText?: string;
}

const Empty: React.FC<Props> = ({ additionalText }) => {
  return (
    <Center innerClassName="ion-text-center">
      <Flex align="center" direction="column" gap={5}>
        <IonText>We are sorry, but there is nothing here... :(</IonText>
        {additionalText && <IonText>{additionalText}</IonText>}
      </Flex>
    </Center>
  );
};

export default Empty;
