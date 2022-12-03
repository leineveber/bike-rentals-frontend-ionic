import { IonList } from "@ionic/react";
import React from "react";
import Empty from "../../../common/components/Empty/Empty";
import Loading from "../../../common/components/Loading/Loading";
import Page from "../../../common/components/Page/Page";
import { withAdmin } from "../../../common/hocs/withAdmin";
import { RouteEnum } from "../../../common/models/RouteEnum";
import UserCard from "../components/UserCard/UserCard";
import { useAllUsers } from "../hooks/useAllUsers";
import { useDeleteUser } from "../hooks/useDeleteUser";

const AllUsersPage: React.FC = () => {
  const { data: users, isLoading } = useAllUsers();

  const { mutateAsync: deleteUser } = useDeleteUser();

  return (
    <Page
      withBackButton
      defaultBackButtonHref={RouteEnum.DASHBOARD}
      title="All users"
    >
      {isLoading ? (
        <Loading />
      ) : users ? (
        <IonList>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={() => deleteUser(user.id)}
            />
          ))}
        </IonList>
      ) : (
        <Empty />
      )}
    </Page>
  );
};

export default withAdmin(AllUsersPage);
