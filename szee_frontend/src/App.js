import './app.scss';
import { Content, Theme } from '@carbon/react';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { defaultUser } from './consts/defaultUser';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import StartPage from './pages/StartPage/StartPage';
import ProtectedRoute from './utils/ProtectedRoute';
import { NotificationProvider } from './context/NotificationContext';
import { AutoTheme } from './components/AutoTheme/AutoTheme';
import AppHeader from './components/AppHeader/AppHeader';

const App = () => {

  const [user, setUser] = useState(defaultUser)

  return (
    <AutoTheme>
      {/* <Content className='content'> */}
        <NotificationProvider>
          <Theme theme='g100'>
            <AppHeader user={user} setUser={setUser} />
          </Theme>
          <Content className='content'>
            <Routes>
              <Route path='/' element={<StartPage user={user} />} />
              <Route path='/main' element={<ProtectedRoute user={user}><MainPage user={user} /></ProtectedRoute>} />
              <Route path='/login' element={<LoginPage setUser={setUser} />} />
              <Route path='/register' element={<RegisterPage />} />
            </Routes>
          </Content>
        </NotificationProvider>
      {/* </Content> */}
    </AutoTheme>
  );
}

export default App;
