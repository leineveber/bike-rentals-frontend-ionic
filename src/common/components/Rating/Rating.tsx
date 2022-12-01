import { IonIcon } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import React from "react";
import Flex from "../Flex/Flex";

interface Props {
  value: number;
}

const Rating: React.FC<Props> = ({ value }) => {
  return (
    <Flex gap={10}>
      {Array.from({ length: 5 }).map((_, i) =>
        i < value ? (
          <IonIcon key={i} size="small" color="warning" icon={star} />
        ) : (
          <IonIcon key={i} size="small" icon={starOutline} />
        )
      )}
    </Flex>
  );
};

export default Rating;
