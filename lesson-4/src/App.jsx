import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

import PostList from './features/post/PostList';
import AddPostForm from './features/post/AddPostForm';
import SinglePostPage from './features/post/SinglePostPage';
import EditPostForm from './features/post/EditPostForm';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PostList />} />
        <Route path='post'>
          <Route index element={<AddPostForm />} />
          <Route path=':postId' element={<SinglePostPage />} />
          <Route path='edit/:postId' element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
