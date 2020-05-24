import React from 'react';
import { useSelector } from 'react-redux';
import {
  Switch, Route, Redirect, RouteProps,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { ApplicationState } from './store';
import { SystemState } from './store/system/types';
import GlobalStyle from './styles/GlobalStyle';
import themesConfig from './config/themes';

import SnackBar from './components/SnackBar';
import AuthLayout from './components/AuthLayout';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Reset from './pages/Reset';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

interface OwnProps {
  isAuthorized: boolean;
  redirect: string;
}

type ProtectedRouteProps = OwnProps & RouteProps;

const AuthRoute = ({
  isAuthorized,
  children,
  redirect,
  ...rest
}: ProtectedRouteProps) => (
  <Route
    {...rest}
    render={() => (isAuthorized ? children : <Redirect to={redirect} />)}
  />
);

function Router() {
  const {
    isAuthorized,
    theme,
  } = useSelector<ApplicationState, SystemState>((state) => state.system);

  return (
    <>
      <ThemeProvider theme={themesConfig[theme]}>
        <GlobalStyle />

        <Switch>
          <AuthRoute
            exact
            path={['/login', '/register', '/reset']}
            isAuthorized={!isAuthorized}
            redirect="/"
          >
            <AuthLayout>
              <Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/reset" component={Reset} />
              </Switch>
            </AuthLayout>
          </AuthRoute>

          <AuthRoute path="/" isAuthorized={isAuthorized} redirect="/login">
            <AppLayout>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/:username" component={Profile} />
                <Route path="*" component={NotFound} />
              </Switch>
            </AppLayout>
          </AuthRoute>
        </Switch>

        <SnackBar />
      </ThemeProvider>
    </>
  );
}

export default Router;
