import { IonList } from "@ionic/react";
import React, { useMemo, useState } from "react";
import Empty from "../../../common/components/Empty/Empty";
import Loading from "../../../common/components/Loading/Loading";
import Page from "../../../common/components/Page/Page";
import { withAdmin } from "../../../common/hocs/withAdmin";
import { RouteEnum } from "../../../common/models/RouteEnum";
import { useAllUsers } from "../../all-users/hooks/useAllUsers";
import HistoryModal from "../components/HistoryModal/HistoryModal";
import UsersWithBikesCard from "../components/UserWithBikesCard/UsersWithBikesCard";
import { UserRent } from "../../../api/user/user.types";

const UsersWhoReservedABikePage: React.FC = () => {
  const { data: users, isLoading } = useAllUsers();

  const usersWithBikes = useMemo(
    () => users?.filter((user) => user?.history?.length),
    [users]
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentHistory, setCurrentHistory] = useState<
    UserRent[] | null | undefined
  >(null);

  return (
    <>
      <Page
        withBackButton
        defaultBackButtonHref={RouteEnum.DASHBOARD}
        title="Users, who reserved a bike"
      >
        {isLoading ? (
          <Loading />
        ) : usersWithBikes?.length ? (
          <IonList>
            {usersWithBikes.map((user) => (
              <UsersWithBikesCard
                key={user.id}
                user={user}
                onHistory={() => {
                  setIsModalVisible(true);
                  setCurrentHistory(user.history);
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

export default withAdmin(UsersWhoReservedABikePage);
