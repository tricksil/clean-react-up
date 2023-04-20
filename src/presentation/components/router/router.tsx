import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignUp } from '@/presentation/pages';

type Props = {
  makeLogin: React.FC;
};

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route key={'login'} path="login" Component={makeLogin} />
        <Route key={'signup'} path="signup" Component={SignUp} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
