import React from 'react';
//pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPages from './pages/SignupPages';
import Dashboard from './pages/Dashboard';
//styled commponents
import { StyledContainer } from './components/Styles';

import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/AuthRoute';

//auyh & redux
import AuthRoute from './components/AuthRoute';
import BasicRoute from './components/BasicRoute';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <StyledContainer>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
         
          <Route path='/dashboard' 
          element={
            <RequireAuth redirectTo='/login'>
          <Dashboard  />
          </RequireAuth>
        } />
        </Routes>


      </StyledContainer>
    </div>
  );
}


export default App;
