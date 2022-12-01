import styled from "styled-components";

interface Props {
  direction?: "row" | "column";
  gap?: number;
  align?: "center" | "flex-start" | "flex-end";
  justify?: "center" | "flex-start" | "flex-end";
}

const Flex = styled.div<Props>`
  display: flex;

  ${(props) => `flex-direction: ${props.direction || "row"}`};
  ${(props) => `gap: ${`${props.gap}px` || "0px"}`};
  ${(props) => `align-items: ${props.align || "unset"}`};
  ${(props) => `justify-items: ${props.justify || "unset"}`};
`;

export default Flex;