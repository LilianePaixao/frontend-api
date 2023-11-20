import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
 width: 100%;
  height: 100vh;

  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows:105px 128px auto 64px;
  grid-template-areas: 
  "brand header"
  "menu search"
  "menu content"
  "newNote content";

  background: ${({ theme }) => theme.COLORS.BACKGROUND_800};

`
export const Brand = styled.div`
  grid-area: brand;
  display: grid;
  place-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_700};

  background : ${({ theme }) => theme.COLORS.BACKGROUND_900};

  > h1 {
  color: ${({ theme })=> theme.COLORS.ORANGE};
  font: 24px;
  }
`
export const Menu = styled.ul`
  grid-area: menu;
  background : ${({ theme })=> theme.COLORS.BACKGROUND_900};
  display: flex;
  
  flex-direction: column;
  padding-top:64px;

  > li {
    margin-bottom: 24px;
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    color: ${({ theme })=> theme.BACKGROUND_100};
    text-align: center;
  }

    
`
export const Search = styled.div`
  grid-area: search;
  padding: 64px 64px 0px;
 
`
export const Content = styled.div`
  grid-area: content;
  padding: 0px 64px;
  overflow-y: auto;
  
`
export const NewNote = styled(Link)`
  grid-area: newNote;
  background : ${({ theme }) => theme.COLORS.ORANGE};
  color : ${({ theme }) => theme.COLORS.BACKGROUND_900};
  border:none;
  display:flex;
  justify-content: center;
  align-items: center;
  
  
  > span {
    padding-left: 8px ;
  }
`

