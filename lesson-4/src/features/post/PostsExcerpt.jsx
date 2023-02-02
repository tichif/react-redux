import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButton from './ReactionsButton';
import { Link } from 'react-router-dom';

const PostsExcerpt = ({ post }) => {
  return (
    <article>
      <h2>{post.title}</h2>
      <p className='excerpt'>{post.body.substring(0, 75)}...</p>
      <p className='postCredit'>
        <Link to={`/post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionsButton post={post} />
    </article>
  );
};

export default PostsExcerpt;
