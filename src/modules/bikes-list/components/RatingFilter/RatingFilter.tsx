import { IonInput, IonItem, IonLabel, useIonAlert } from "@ionic/react";
import React, { useEffect } from "react";
import Flex from "../../../../common/components/Flex/Flex";
import { FilterProps } from "../../models/filter.model";

interface Props extends FilterProps {}

const RatingFilter: React.FC<Props> = ({ filter, setFilter }) => {
  const [showAlert] = useIonAlert();

  useEffect(() => {
    if (filter.rating[0] && filter.rating[1]) {
      if (parseInt(filter.rating[0], 10) > parseInt(filter.rating[1], 10)) {
        showAlert({
          message: "Rating 'from' can't be higher than rating 'to'!",
          buttons: ["Ok"],
        });
        setFilter((prev) => ({ ...prev, rating: ["", ""] }));
      }
    }
  }, [filter.rating, setFilter, showAlert]);

  return (
    <Flex direction="column" gap={5}>
      <IonLabel>Rating:</IonLabel>

      <Flex>
        <IonItem>
          <IonInput
            type="number"
            placeholder="From"
            value={filter.rating[0].toString()}
            onIonChange={(event) =>
              setFilter((prev) => ({
                ...prev,
                rating: [event.target.value as string, filter.rating[1]],
              }))
            }
          />
        </IonItem>

        <IonItem>
          <IonInput
            type="number"
            placeholder="To"
            value={filter.rating[1].toString()}
            onIonChange={(event) =>
              setFilter((prev) => ({
                ...prev,
                rating: [filter.rating[0], event.target.value as string],
              }))
            }
          />
        </IonItem>
      </Flex>
    </Flex>
  );
};

export default RatingFilter;
