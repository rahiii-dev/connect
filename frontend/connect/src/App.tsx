import { Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import Protected from './components/Protected';

function App() {

  useEffect(() => {

    toast.error('This is a success message!', {
      className: 'bg-dark-bg text-dark-text',
      bodyClassName: 'text-dark-text',
      progressClassName: 'bg-blue-accent',
    });
  }, []);

  return (
    <>
      <Routes>
        {/* protected */}
        <Route path='/' element={<Protected><ChatPage /></Protected>} />
        <Route path='/profile' element={<ProfilePage />} />
        {/* not protected */}
        <Route path='/auth' element={<AuthPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App
