import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { ApplicationState } from '../../store';
import { SystemState } from '../../store/system/types';
import { showSnackBar } from '../../store/system/actions';
import { timelineReset, nextPage } from '../../store/timeline/actions';


import useFetchApi from '../../hooks/useFetchApi';
import { postRepository } from '../../repositories';

import InputFile from './InputFile';
import Timeline from '../../components/Timeline';
import Button from '../../components/Button';
import UserPicture from '../../components/UserPicture';

import {
  Container, NewPost, Actions, NewPostGroup, ErrorMessage, TextArea,
} from './styles';

const PostSchema = Yup.object().shape({
  text: Yup.string().trim().max(5000),
});

function Home() {
  const dispatch = useDispatch();
  const [{ isLoading, isError, data }, setFetch] = useFetchApi(postRepository.create);

  const {
    handleSubmit,
    setFieldValue,
    getFieldProps,
    values: { text, file },
  } = useFormik({
    initialValues: { text: '', file: null },
    validationSchema: PostSchema,
    onSubmit: async (values, { resetForm }) => {
      const response = await setFetch(values);
      if (response) {
        const message = response?.message || '';
        dispatch(showSnackBar({ type: 'success', message }));
        resetForm();
        dispatch(timelineReset());
        dispatch(nextPage());
      }
    },
  });
  const { user } = useSelector<ApplicationState, SystemState>((state) => state.system);

  const handleChangeFile = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (!target.files?.length) { return; }
    setFieldValue('file', target.files[0]);
  };

  return (
    <Container>
      <NewPost>
        <form onSubmit={handleSubmit}>
          <NewPostGroup>
            <UserPicture
              src={user.profile.picture}
              username={user.username}
              height={50}
            />
            <TextArea
              placeholder="What's going on?"
              {...getFieldProps('text')}
              maxLength={5000}
            />
          </NewPostGroup>
          <Actions>
            <InputFile
              file={file}
              onRemove={() => setFieldValue('file', null)}
              onChange={handleChangeFile}
            />
            <Button
              type="submit"
              color="primary"
              loading={isLoading}
              disabled={!text && !file}
            >
              Post
            </Button>
          </Actions>
        </form>

        { isError && <ErrorMessage>{data?.message}</ErrorMessage> }
      </NewPost>

      <Timeline />
    </Container>
  );
}

export default Home;
