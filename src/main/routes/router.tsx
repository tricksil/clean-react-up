import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory';
import { ApiContext } from '@/presentation/contexts';
import { SurveyList } from '@/presentation/pages';
import { setCurrentAccountAdapter } from '../adapters/current-account-adapter';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route key="login" path="login" Component={makeLogin} />
          <Route key="signup" path="signup" Component={makeSignUp} />
          <Route key="/" path="/" Component={SurveyList} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
