import { IonCheckbox, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import Flex from "../../../../common/components/Flex/Flex";
import { FilterProps } from "../../models/filter.model";

interface Props extends FilterProps {
  models: string[];
}

const ModelFilter: React.FC<Props> = ({ models, filter, setFilter }) => {
  return (
    <Flex direction="column" gap={5}>
      <IonLabel>Model:</IonLabel>
      {models.map((model) => (
        <IonItem
          onClick={() =>
            setFilter((prev) => ({
              ...prev,
              model: prev.model.includes(model)
                ? prev.model.filter((stateModel) => stateModel !== model)
                : [...prev.model, model],
            }))
          }
        >
          <IonCheckbox checked={filter.model.includes(model)} slot="start" />
          <IonLabel>{model}</IonLabel>
        </IonItem>
      ))}
    </Flex>
  );
};

export default ModelFilter;
