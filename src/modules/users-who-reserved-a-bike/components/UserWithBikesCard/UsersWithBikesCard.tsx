import React from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { User } from "../../../../services/user/user.types";

interface Props {
  user: User;
  onHistory: () => void;
}

const UsersWithBikesCard: React.FC<Props> = ({ user, onHistory }) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>{user.email}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonButton onClick={onHistory}>History</IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default UsersWithBikesCard;
