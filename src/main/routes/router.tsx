import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '@/main/adapters/current-account-adapter';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory';
import { ApiContext } from '@/presentation/contexts';
import { SurveyList } from '@/presentation/pages';
import { PrivateRoute } from '@/presentation/components';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="login" Component={makeLogin} />
          <Route path="signup" Component={makeSignUp} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" Component={SurveyList} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
