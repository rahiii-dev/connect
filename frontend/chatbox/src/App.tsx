import {Route, Routes} from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {

  return (
    <Routes>
      <Route path='/' element={<ChatPage />}/>
      <Route path='/auth' element={<AuthPage />}/>
      <Route path='*' element={<NotFoundPage />}/>
    </Routes>
  )
}

export default App
