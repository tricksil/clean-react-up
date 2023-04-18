import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

type Props = {
  makeLogin: React.FC;
};

const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route key={'login'} path="login" Component={makeLogin} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
