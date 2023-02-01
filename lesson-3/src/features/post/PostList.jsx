import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectAllPosts,
  getPostError,
  getPostStatus,
  fetchPosts,
} from './postsSlice';
import PostsExcerpt from './PostsExcerpt';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
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
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostsExcerpt key={post.id} post={post} />
    ));
  } else if (status === 'failed') {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostList;
