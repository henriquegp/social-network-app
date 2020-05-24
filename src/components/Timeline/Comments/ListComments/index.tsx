import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { FaEllipsisH, FaTrashAlt, FaEdit } from 'react-icons/fa';

import { User } from '../../../../store/system/types';
import MenuList from '../../../MenuList';
import MenuItem from '../../../MenuList/MenuItem';
import Modal from '../../../Modal';
import Button from '../../../Button';
import UserPicture from '../../../UserPicture';
import { Comment } from '../../../../repositories/commentRepository';
import { postCommentsDelete, postCommentsUpdate } from '../../../../store/timeline/actions';

import {
  CommentLine, Text, LinkName, MenuContainer, Title, ModalActions, TextArea,
} from './styles';

interface Props {
  postId: number;
  comments?: Comment[];
  user: User;
}

function ListComments({
  postId, comments, user,
}: Props) {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [formUpdate, setFormUpdate] = useState({
    commentId: 0,
    text: '',
  });

  function handleUpdate(commentId: number, text: string) {
    setFormUpdate({ commentId, text });
    setShowModal(true);
  }

  const { handleSubmit, getFieldProps } = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...formUpdate,
    },
    onSubmit: async ({ text, commentId }) => {
      dispatch(postCommentsUpdate(postId, commentId, text));
      setShowModal(false);
    },
  });

  return (
    <div>
      <ul>
        { comments?.map((comment) => (
          <li key={comment.commentId}>
            <CommentLine>
              <UserPicture
                height={40}
                username={comment.user.username}
                src={comment.user.profile.picture}
              />

              <Text>
                <LinkName to="/profile">{comment.user.profile.name}</LinkName>
                <div>{comment.text}</div>
              </Text>

              {comment.user.username === user.username && (
              <MenuContainer>
                <MenuList toggle={<FaEllipsisH size={17} />}>
                  <MenuItem
                    text="Edit"
                    icon={<FaEdit size={17} />}
                    onClick={() => handleUpdate(comment.commentId, comment.text)}
                  />
                  <MenuItem
                    text="Delete"
                    color="danger"
                    icon={<FaTrashAlt size={17} />}
                    onClick={() => dispatch(postCommentsDelete(postId, comment.commentId))}
                  />
                </MenuList>
              </MenuContainer>
              )}
            </CommentLine>
          </li>
        )) }
      </ul>

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
      >
        <Title>Edit Comment</Title>
        <form onSubmit={handleSubmit}>
          <TextArea
            placeholder="Edit your Comment"
            maxLength={500}
            {...getFieldProps('text')}
          />
          <ModalActions>
            <Button type="button" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" color="success">Edit</Button>
          </ModalActions>
        </form>
      </Modal>
    </div>
  );
}

export default ListComments;
