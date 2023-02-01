import { useSelector } from 'react-redux';

import { selectedUsers } from '../users/usersSlice';

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectedUsers);

  const author = users.find((user) => user.id === userId);

  return <span>by {author ? author.name : 'Unknown Author'}</span>;
};

export default PostAuthor;
