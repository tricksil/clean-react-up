import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

type Factory = {
  makeLogin: React.FC;
  makeSignUp: React.FC;
};

const Router: React.FC<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route key={'login'} path="login" Component={factory.makeLogin} />
        <Route key={'signup'} path="signup" Component={factory.makeSignUp} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
