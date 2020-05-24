import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';

import { ApplicationState } from '../../store';
import { TimelineState } from '../../store/timeline/types';
import { timelineReset, nextPage } from '../../store/timeline/actions';

import Post from './Post';

import {
  Container, List, Loader, ErrorMessage,
} from './styles';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

interface Props {
  userId?: number;
}

function Timeline({ userId }: Props) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const {
    isLoading, errorMessage, posts,
  } = useSelector<ApplicationState, TimelineState>((state) => state.timeline);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(timelineReset(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    const loader = loaderRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(nextPage());
      }
    }, options);

    if (loader) { observer.observe(loader); }
    return () => {
      if (loader) { observer.unobserve(loader); }
    };
  }, [dispatch]);

  return (
    <Container>
      <List>
        {errorMessage
          ? <ErrorMessage>{errorMessage}</ErrorMessage>
          : (
            posts.map((post) => (
              <li key={post.postId}>
                <Post data={post} />
              </li>
            ))
          )}
      </List>

      <Loader ref={loaderRef} />
      { isLoading && <FaSpinner size={25} /> }
    </Container>
  );
}

export default Timeline;
