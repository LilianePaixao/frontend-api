import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  color: ${({ theme, $isactive }) => $isactive ? theme.COLORS.ORANGE : theme.COLORS.GRAY_100};
  background: none;
  border:none;
`