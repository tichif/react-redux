import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { selectedPostById, updatePost, deletePost } from './postsSlice';
import { selectedUsers } from '../users/usersSlice';

const EditPostForm = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectedPostById(state, Number(postId)));

  const [title, setTitle] = useState(post?.title);
  const [body, setBody] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const navigate = useNavigate();

  const users = useSelector(selectedUsers);

  const dispatch = useDispatch();

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onBodyChanged = (e) => setBody(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, body, userId].every(Boolean) && addRequestStatus === 'idle';

  function onSavePostHandler() {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(
          updatePost({
            id: post.id,
            title,
            body,
            userId,
            reactions: post.reactions,
          })
        ).unwrap();
        setTitle('');
        setBody('');
        setUserId('');
        navigate(`/post/${post.id}`);
      } catch (error) {
        console.log('Unable to pursue', error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  }

  function onDeletePostHandler() {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(
          deletePost({
            id: post.id,
          })
        ).unwrap();
        setTitle('');
        setBody('');
        setUserId('');
        navigate('/');
      } catch (error) {
        console.log('Unable to pursue', error);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  }

  const userOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor='postTitle'>Post Title:</label>
        <input
          type='text'
          id='postTitle'
          name='postTitle'
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor='postAuthor'>Author:</label>
        <select
          id='postAuthor'
          onChange={onAuthorChanged}
          defaultValue={userId}
        >
          <option value=''></option>
          {userOptions}
        </select>

        <label htmlFor='postBody'>Body:</label>
        <textarea
          id='postBody'
          name='postBody'
          value={body}
          onChange={onBodyChanged}
        />
        <button type='button' onClick={onSavePostHandler} disabled={!canSave}>
          Save Post
        </button>
        <button className='deleteButton' onClick={onDeletePostHandler}>
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPostForm;
