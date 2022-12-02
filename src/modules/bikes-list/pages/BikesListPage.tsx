import React, { useEffect, useState } from "react";
import { IonCol, IonList, IonRow } from "@ionic/react";
import Page from "../../../common/components/Page/Page";
import BikeCard from "../components/BikeCard/BikeCard";
import BikesFilter from "../components/BikesFilter/BikesFilter";
import { useBikes } from "../hooks/useBikes";
import { Bike } from "../../../services/bikes/bikes.types";
import BikeRentModal from "../components/BikeRentModal/BikeRentModal";
import { dateService } from "../../../services/date/date.service";
import { useMe } from "../../../common/hooks/useMe";
import Loading from "../../../common/components/Loading/Loading";

const filterID = "filter";

let id: ReturnType<typeof setInterval>;

const BikesListPage: React.FC = () => {
  const { data: bikes, isLoading } = useBikes();

  const { data: user } = useMe();

  const [activeBike, setActiveBike] = useState<Bike | null>(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [now, setNow] = useState(dateService.getNow());

  useEffect(() => {
    id = setInterval(() => {
      setNow(dateService.getNow());
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <>
      <BikesFilter id={filterID} />

      <Page id={filterID} title="Bikes" withMenu>
        {isLoading ? (
          <Loading />
        ) : (
          <IonList>
            <IonRow>
              {bikes?.map((bike) => (
                <IonCol size="12" key={bike.id}>
                  <BikeCard
                    now={now}
                    userID={user?.id}
                    bike={bike}
                    onRent={() => {
                      setIsVisibleModal(true);
                      setActiveBike(bike);
                    }}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonList>
        )}
      </Page>

      <BikeRentModal
        bike={activeBike}
        isOpen={isVisibleModal}
        onClose={() => {
          setIsVisibleModal(false);
          setActiveBike(null);
        }}
      />
    </>
  );
};

export default BikesListPage;
