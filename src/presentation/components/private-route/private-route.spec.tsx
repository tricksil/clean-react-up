import React from 'react';
import { render } from '@testing-library/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute />} />
          <Route key="login" path="login" Component={jest.fn()} />
        </Routes>
      </BrowserRouter>
    );

    expect(window.location.pathname).toBe('/login');
  });
});
