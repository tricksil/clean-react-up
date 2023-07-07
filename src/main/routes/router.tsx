import { makeLogin, makeSignUp, makeSurveyList } from '@/main/factories/pages';
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '@/main/adapters/current-account-adapter';
import { ApiContext } from '@/presentation/contexts';
import { PrivateRoute } from '@/presentation/components';
import { SurveyResult } from '@/presentation/pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

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
          <Route element={<PrivateRoute />}>
            <Route path="/" Component={makeSurveyList} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/surveys" Component={SurveyResult} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );
};

export default Router;
