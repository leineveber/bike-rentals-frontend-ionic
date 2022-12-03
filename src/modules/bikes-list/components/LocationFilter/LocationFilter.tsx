import { IonInput, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import Flex from "../../../../common/components/Flex/Flex";
import { FilterProps } from "../../models/filter.model";

interface Props extends FilterProps {}

const LocationFilter: React.FC<Props> = ({ filter, setFilter }) => {
  return (
    <Flex direction="column" gap={5}>
      <IonLabel>Location:</IonLabel>

      <IonItem>
        <IonInput
          placeholder="E.g. New York"
          value={filter.location}
          onIonChange={(event) =>
            setFilter((prev) => ({
              ...prev,
              location: event.target.value as string,
            }))
          }
        />
      </IonItem>
    </Flex>
  );
};

export default LocationFilter;
