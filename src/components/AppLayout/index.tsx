import React, { ReactChild } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

import SearchProfile from './SeachProfile';
import Options from './Options';
import Notifications from './Notifications';

import {
  AppContainer, NavBar, NavBarContainer, Content, Logo, ActionsLink, Line,
} from './styles';

interface Props {
  children: ReactChild;
}

function AppLayout({ children }: Props) {
  const location = useLocation();

  return (
    <AppContainer>
      <header>
        <NavBar>
          <NavBarContainer>
            <Logo>
              <Link to="/">Social</Link>
            </Logo>

            <SearchProfile />

            <ActionsLink>
              <ul>
                <Line title="Home" match={location.pathname === '/'}>
                  <Link to="/"><FaHome size="19" /></Link>
                </Line>

                <Line>
                  <Notifications />
                </Line>

                <Line>
                  <Options />
                </Line>
              </ul>
            </ActionsLink>
          </NavBarContainer>
        </NavBar>
      </header>

      <section>
        <Content>
          { children }
        </Content>
      </section>
    </AppContainer>
  );
}

export default AppLayout;
