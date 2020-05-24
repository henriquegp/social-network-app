import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { showSnackBar } from '../../store/system/actions';

import { authRepository } from '../../repositories';
import useFetchApi from '../../hooks/useFetchApi';

import { Container, ErrorMessage } from './styles';
import { Input } from '../../components/Form';
import Button from '../../components/Button';

const schema = Yup.object().shape({
  name: Yup.string().max(60).required('Required'),
  username: Yup.string().max(20).required('Required'),
  email: Yup.string().max(80).required('Required').email('Invalid email'),
  password: Yup.string().min(8).max(20).required('Required'),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const initialForm = {
  name: '',
  username: '',
  password: '',
  email: '',
  confirmPassword: '',
};

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [{ isError, isLoading, data }, setFetchApi] = useFetchApi(authRepository.register);

  return (
    <Container>
      <h3>Register</h3>
      <Formik
        initialValues={initialForm}
        validationSchema={schema}
        onSubmit={async (values) => {
          const response = await setFetchApi(values);
          if (response) {
            const message = response?.message || '';
            dispatch(showSnackBar({ type: 'success', message }));
            history.push('/');
          }
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Input name="name" placeholder="Name" />
            <Input name="username" placeholder="Username" />
            <Input name="email" placeholder="E-mail" />
            <Input name="password" type="password" placeholder="Password" />
            <Input name="confirmPassword" type="password" placeholder="Confirm Password" />
            <Button type="submit" loading={isLoading} color="primary">Register</Button>
          </form>
        )}
      </Formik>

      {isError && <ErrorMessage>{data?.message}</ErrorMessage>}

    </Container>
  );
}

export default Register;
