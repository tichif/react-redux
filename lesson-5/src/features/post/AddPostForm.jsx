import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addNewPost } from './postsSlice';
import { selectedUsers } from '../users/usersSlice';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userId, setUserId] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const users = useSelector(selectedUsers);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onBodyChanged = (e) => setBody(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, body, userId].every(Boolean) && addRequestStatus === 'idle';

  function onSavePostHandler() {
    if (canSave) {
      try {
        setAddRequestStatus('pending');
        dispatch(addNewPost({ title, body, userId })).unwrap();
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
      <h2>Add a New Post</h2>
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
        <select onChange={onAuthorChanged} value={userId}>
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
      </form>
    </section>
  );
};

export default AddPostForm;
