import { IonSpinner } from "@ionic/react";
import React from "react";
import styled from "styled-components";
import Center from "../Center/Center";

const StyledCenter = styled(Center)`
  > div {
    display: flex;
    justify-content: center;
  }
`;

const Loading: React.FC = () => {
  return (
    <StyledCenter>
      <IonSpinner />
    </StyledCenter>
  );
};

export default Loading;
