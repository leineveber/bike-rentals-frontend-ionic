import { IonIcon } from "@ionic/react";
import { star, starOutline } from "ionicons/icons";
import React from "react";
import Flex from "../Flex/Flex";

interface Props {
  value: number | null | undefined;
  onChange: (value: number) => void;
}

export const Rate: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (i: number) => onChange(i + 1);

  return (
    <Flex gap={20} align="center" justify="center">
      {Array.from({ length: 5 }).map((_, i) =>
        value && i < value ? (
          <div role="button" key={i} onClick={() => handleChange(i)}>
            <IonIcon
              size="small"
              slot="icon-only"
              icon={star}
              color="warning"
            />
          </div>
        ) : (
          <div role="button" key={i} onClick={() => handleChange(i)}>
            <IonIcon size="small" slot="icon-only" icon={starOutline}></IonIcon>
          </div>
        )
      )}
    </Flex>
  );
};
