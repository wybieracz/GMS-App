import './app.scss';
import { Content, Theme } from '@carbon/react';
import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { defaultUser } from './consts/defaultUser';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import StartPage from './pages/StartPage/StartPage';
import DevicesPage from './pages/DevicesPage/DevicesPage';
import DevicePage from './pages/DevicePage/DevicePage';
import ProtectedRoute from './utils/ProtectedRoute';
import { NotificationProvider } from './context/NotificationContext';
import { AutoTheme } from './components/AutoTheme/AutoTheme';
import AppHeader from './components/AppHeader/AppHeader';
import SettingsPage from './pages/SettingsPage/SettingsPage';

const App = () => {

  const [user, setUser] = useState(defaultUser);
  const navigate = useNavigate();

  function sessionExpired(notifications) {
    setUser(defaultUser)
    navigate('/login')
    notifications.warning('Please log in to proceed.', 'Session expired')
  }

  return (
    <AutoTheme>
      <NotificationProvider>
        <Theme theme='g100'>
          <AppHeader user={user} setUser={setUser} />
        </Theme>
        <Content className='content'>
          <Routes>
            <Route path='/' element={<StartPage user={user} />} />
            <Route path='/main' element={<ProtectedRoute user={user}><MainPage user={user} /></ProtectedRoute>} />
            <Route path='/devices' element={<ProtectedRoute user={user}><DevicesPage user={user} sessionExpired={sessionExpired} /></ProtectedRoute>} />
            <Route path='/device/:id' element={<ProtectedRoute user={user}><DevicePage user={user} sessionExpired={sessionExpired} /></ProtectedRoute>} />
            <Route path='/settings' element={<ProtectedRoute user={user}><SettingsPage user={user} sessionExpired={sessionExpired} /></ProtectedRoute>} />
            <Route path='/login' element={<LoginPage setUser={setUser} />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </Content>
      </NotificationProvider>
    </AutoTheme>
  );
}

export default App;
