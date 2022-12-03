import { IonList } from "@ionic/react";
import React, { useState } from "react";
import Empty from "../../../common/components/Empty/Empty";
import Loading from "../../../common/components/Loading/Loading";
import Page from "../../../common/components/Page/Page";
import { withAdmin } from "../../../common/hocs/withAdmin";
import { RouteEnum } from "../../../common/models/RouteEnum";
import { RentHistoryItem } from "../../../services/bikes/bikes.types";
import { useBikes } from "../../bikes-list/hooks/useBikes";
import BikeByUserCard from "../components/BikeByUserCard/BikeByUserCard";
import HistoryModal from "../components/HistoryModal/HistoryModal";

const BikesReservedByUsersPage: React.FC = () => {
  const { data: bikes, isLoading } = useBikes();

  const bikesWithHistory = bikes?.filter((bike) => bike?.history?.length);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentHistory, setCurrentHistory] = useState<
    RentHistoryItem[] | null | undefined
  >(null);

  return (
    <>
      <Page
        withBackButton
        defaultBackButtonHref={RouteEnum.DASHBOARD}
        title="Bikes, reserved by users"
      >
        {isLoading ? (
          <Loading />
        ) : bikesWithHistory?.length ? (
          <IonList>
            {bikesWithHistory.map((bike) => (
              <BikeByUserCard
                key={bike.id}
                bike={bike}
                onHistory={() => {
                  setIsModalVisible(true);
                  setCurrentHistory(bike.history);
                }}
              />
            ))}
          </IonList>
        ) : (
          <Empty />
        )}
      </Page>

      <HistoryModal
        history={currentHistory}
        isOpen={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
          setCurrentHistory(null);
        }}
      />
    </>
  );
};

export default withAdmin(BikesReservedByUsersPage);
