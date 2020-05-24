import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { loginRequest, logout } from '../../store/system/actions';
import { ApplicationState } from '../../store';
import { SystemState } from '../../store/system/types';
import {
  Header, Content, ActionLinks, ErrorMessage,
} from './styles';
import { Input } from '../../components/Form';
import Button from '../../components/Button';
import Link from '../../styles/StyledLink';

const LoginSchema = Yup.object().shape({
  username: Yup.string().max(80).required('Required'),
  password: Yup.string().min(8).max(20).required('Required'),
});

function Login() {
  const {
    errorMessage,
    loading,
  } = useSelector<ApplicationState, SystemState>((state) => state.system);
  const dispatch = useDispatch();

  useEffect(() => { dispatch(logout()); }, [dispatch]);

  return (
    <>
      <Header>Social</Header>
      <Content>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => { dispatch(loginRequest(values)); }}
        >
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Input name="username" placeholder="Username or E-mail" />
              <Input type="password" name="password" placeholder="Password" />
              <Button type="submit" loading={loading} color="primary">Login</Button>
            </form>
          )}
        </Formik>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <ActionLinks>
          <Link to="/reset">Forgot password?</Link>
          <Link to="/register">Register</Link>
        </ActionLinks>

      </Content>
    </>
  );
}

export default Login;
