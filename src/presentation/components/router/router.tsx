import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '@/presentation/pages';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          key={'login'}
          path="login"
          element={<Login validation={undefined} authentication={undefined} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
