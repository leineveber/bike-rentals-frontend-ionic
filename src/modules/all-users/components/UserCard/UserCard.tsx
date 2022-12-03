import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonTitle,
} from "@ionic/react";
import React from "react";
import { User } from "../../../../services/user/user.types";

interface Props {
  user: User;
  onDelete: () => void;
}

const UserCard: React.FC<Props> = ({ user, onDelete }) => {
  const isDisabled = user.role === "admin";

  return (
    <IonCard>
      <IonCardHeader>
        <IonTitle>{user.email}</IonTitle>
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
