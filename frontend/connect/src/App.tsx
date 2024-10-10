import { Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import Protected from './components/Protected';
import { Toaster } from 'sonner';

function App() {

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
      <Toaster
        position='bottom-right'
        toastOptions={{
          classNames: {
            toast: 'bg-dark-bg text-dark-text border border-dark-secondary shadow-md',  
            description: 'text-dark-text', 
            actionButton: 'bg-blue-accent text-dark-text hover:bg-blue-500',  
            cancelButton: 'bg-dark-secondary text-dark-text hover:bg-dark-bg', 
            closeButton: 'bg-blue-accent text-dark-text hover:bg-blue-500', 
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400'
          },
        }}
      />

    </>
  )
}

export default App
