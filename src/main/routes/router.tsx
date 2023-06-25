import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory';
import { SurveyList } from '@/presentation/pages';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route key="login" path="login" Component={makeLogin} />
        <Route key="signup" path="signup" Component={makeSignUp} />
        <Route key="/" path="/" Component={SurveyList} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
