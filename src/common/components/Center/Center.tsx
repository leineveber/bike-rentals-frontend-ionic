import React from "react";
import * as S from "./Center.styles";

interface Props {
  className?: string;
  innerClassName?: string;
  children: React.ReactNode;
}

const Center: React.FC<Props> = ({ className, innerClassName, children }) => {
  return (
    <S.StyledCenter className={className}>
      <div className={innerClassName}>{children}</div>
    </S.StyledCenter>
  );
};

export default Center;
