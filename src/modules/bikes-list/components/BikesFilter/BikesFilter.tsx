import React, { useMemo } from "react";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useBikes } from "../../hooks/useBikes";
import { FilterProps } from "../../models/filter.model";
import { filterInitialState } from "../../pages/BikesListPage";
import ModelFilter from "../ModelFilter/ModelFilter";
import ColorFilter from "../ColorFilter/ColorFilter";
import LocationFilter from "../LocationFilter/LocationFilter";
import RatingFilter from "../RatingFilter/RatingFilter";

interface Props extends FilterProps {
  id: string;
}

const BikesFilter: React.FC<Props> = ({ id, setFilter, filter }) => {
  const { data: bikes } = useBikes();

  const { colors, models } = useMemo(() => {
    if (bikes) {
      return {
        colors: Array.from(new Set(bikes.map((bike) => bike.color))),

        models: Array.from(new Set(bikes.map((bike) => bike.model))),
      };
    }

    return {
      colors: [],
      models: [],
    };
  }, [bikes]);

  const handleClear = () => {
    setFilter(filterInitialState);
  };

  return (
    <IonMenu contentId={id}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
          <div className="ion-margin-bottom">
            <ModelFilter
              models={models}
              filter={filter}
              setFilter={setFilter}
            />
          </div>

          <div className="ion-margin-bottom">
            <ColorFilter
              colors={colors}
              filter={filter}
              setFilter={setFilter}
            />
          </div>

          <div className="ion-margin-bottom">
            <LocationFilter filter={filter} setFilter={setFilter} />
          </div>

          <div className="ion-margin-bottom">
            <RatingFilter filter={filter} setFilter={setFilter} />
          </div>

          <IonButton expand="block" onClick={handleClear}>
            Clear
          </IonButton>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default BikesFilter;
