import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionsButton from './ReactionsButton';
import { selectedPostById, selectPostIds } from './postsSlice';

const PostsExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostIds(state, postId));
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

// let PostsExcerpt = ({ post }) => {
//   return (
//     <article>
//       <h2>{post.title}</h2>
//       <p className='excerpt'>{post.body.substring(0, 75)}...</p>
//       <p className='postCredit'>
//         <Link to={`/post/${post.id}`}>View Post</Link>
//         <PostAuthor userId={post.userId} />
//         <TimeAgo timestamp={post.date} />
//       </p>
//       <ReactionsButton post={post} />
//     </article>
//   );
// };

// PostsExcerpt = React.memo(PostsExcerpt);

export default PostsExcerpt;
