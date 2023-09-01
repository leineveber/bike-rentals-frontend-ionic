import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import Flex from "../../../../common/components/Flex/Flex";
import { FilterProps } from "../../models/filter.model";

interface Props extends FilterProps {
  colors: string[];
}

const ColorFilter: React.FC<Props> = ({ colors, filter, setFilter }) => {
  return (
    <Flex direction="column" gap={5}>
      <IonLabel>Color:</IonLabel>
      {colors.map((color) => (
        <IonItem
          key={color}
          onClick={() =>
            setFilter((prev) => ({
              ...prev,
              color: prev.color.includes(color)
                ? prev.color.filter((stateColor) => stateColor !== color)
                : [...prev.color, color],
            }))
          }
        >
          <IonCheckbox checked={filter.color.includes(color)} slot="start" />
          <IonLabel>{color}</IonLabel>
        </IonItem>
      ))}
    </Flex>
  );
};

export default ColorFilter;
