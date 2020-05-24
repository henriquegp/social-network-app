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
  email: Yup.string().max(80).required('Required').email('Invalid email'),
});

function Reset() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [{ isError, isLoading, data }, setFetchApi] = useFetchApi(authRepository.resetPassword);

  return (
    <Container>
      <h3>Forgot your password?</h3>
      <Formik
        initialValues={{ email: '' }}
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
            <Input name="email" placeholder="E-mail" />
            <Button type="submit" loading={isLoading} color="primary">Login</Button>
          </form>
        )}
      </Formik>

      {isError && <ErrorMessage>{data?.message}</ErrorMessage>}
    </Container>
  );
}

export default Reset;
