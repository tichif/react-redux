import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { selectUserById } from './usersSlice';
import { selectAllPosts, selectPostByUser } from '../post/postsSlice';

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, Number(userId)));

  const posts = useSelector((state) => selectPostByUser(state, Number(userId)));

  const postsTitle = posts.map((post) => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>

      <ol>{postsTitle}</ol>
    </section>
  );
};

export default UserPage;
