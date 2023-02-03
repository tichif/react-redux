import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectPostIds,
  getPostError,
  getPostStatus,
  fetchPosts,
} from './postsSlice';
import PostsExcerpt from './PostsExcerpt';

const PostList = () => {
  const dispatch = useDispatch();
  const orderedPostsIds = useSelector(selectPostIds);
  const status = useSelector(getPostStatus);
  const error = useSelector(getPostError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  let content;
  if (status === 'loading') {
    content = <p>Loading....</p>;
  } else if (status === 'succeed') {
    content = orderedPostsIds.map((post) => (
      <PostsExcerpt key={post} post={post} />
    ));
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};

export default PostList;
