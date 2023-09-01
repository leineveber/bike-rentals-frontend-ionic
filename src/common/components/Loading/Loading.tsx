import { IonSpinner } from "@ionic/react";
import React from "react";
import * as S from "./Loading.styles";

const Loading: React.FC = () => {
  return (
    <S.StyledCenter>
      <IonSpinner />
    </S.StyledCenter>
  );
};

export default Loading;
