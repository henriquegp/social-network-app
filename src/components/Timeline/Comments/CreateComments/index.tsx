import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { FaPaperPlane } from 'react-icons/fa';
import * as Yup from 'yup';

import { User } from '../../../../store/system/types';
import { postCommentsCreate } from '../../../../store/timeline/actions';
import UserPicture from '../../../UserPicture';

import { Container, TextArea } from './styles';
import { Text } from '../ListComments/styles';

const commentSchema = Yup.object().shape({
  text: Yup.string().max(500).required('Required'),
});

interface Props {
  postId: number;
  user: User;
  isLoading: boolean;
}

function CreateComments({ postId, user, isLoading }: Props) {
  const dispatch = useDispatch();

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: { text: '' },
    validationSchema: commentSchema,
    onSubmit: async ({ text }, { resetForm }) => {
      dispatch(postCommentsCreate(postId, text));
      resetForm();
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <Container>
        <UserPicture
          height={40}
          username={user.username}
          src={user.profile.picture}
        />

        <Text>
          <TextArea
            placeholder="Type a comment"
            disabled={isLoading}
            maxLength={500}
            {...getFieldProps('text')}
          />
        </Text>

        <button
          type="submit"
          disabled={isLoading}
        >
          <FaPaperPlane size={17} />
        </button>
      </Container>
    </form>
  );
}

export default CreateComments;
