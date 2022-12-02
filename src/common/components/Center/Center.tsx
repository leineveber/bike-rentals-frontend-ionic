import React from "react";
import * as S from "./Center.styles";

interface Props {
  children: React.ReactNode;
}

const Center: React.FC<Props> = ({ children }) => {
  return (
    <S.StyledCenter>
      <div>{children}</div>
    </S.StyledCenter>
  );
};

export default Center;
