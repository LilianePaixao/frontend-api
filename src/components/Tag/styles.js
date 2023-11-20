import styled from "styled-components"

export const Container = styled.span`
  width: 64px;
  height: 24px;
  padding: 5px 14px;
  background-color: ${({theme}) => theme.COLORS.ORANGE};
  
  color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  font-size: 12px;
  font-weight: 400;
  line-height: 14px;
  text-align: center;

  border-radius: 5px;
  border:none;
  margin-right: 6px;

`