import styled from 'styled-components';

export const AppContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const Container = styled.div`
  max-width: 960px;
  width: 100%;
  margin: 0px auto;
`;

export const NavBar = styled.nav`
  background: ${({ theme }) => theme.navBar};
  padding: 0px 5px;
  height: 5.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 2px rgb(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
`;

export const NavBarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: baseline;
`;

export const Logo = styled.div`
  font-weight: 500;
  font-size: 2.1rem;
  
  a {
    text-decoration: none;
    color: inherit;

    :hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;


export const ActionsLink = styled.div`
  ul {
    list-style: none;
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

interface LineProp {
  match?: boolean;
}

export const Line = styled.li<LineProp>`
  display: inline-block;
  margin-left: 20px;
  color: ${({ theme, match }) => (match ? theme.primary : 'inherit')};

  a {  
    color: inherit;
    :hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

export const Content = styled(Container)`
  margin-top: 5.4rem;
  width: 100%;
`;
