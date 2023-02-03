import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButton from './ReactionsButton';
import { selectedPostById } from './postsSlice';

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectedPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p className='postCredit'>
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionsButton post={post} />
    </article>
  );
};

export default SinglePostPage;
