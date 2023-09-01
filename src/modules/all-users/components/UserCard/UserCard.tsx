import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import React from "react";
import { User } from "../../../../api/user/user.types";

interface Props {
  user: User;
  onDelete: () => void;
}

const UserCard: React.FC<Props> = ({ user, onDelete }) => {
  const isDisabled = user.role === "admin";

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{user.email}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonButton expand="block" disabled={isDisabled} onClick={onDelete}>
          Delete
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default UserCard;
