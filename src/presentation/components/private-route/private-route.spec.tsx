import React from 'react';
import { render } from '@testing-library/react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import ApiContext from '@/presentation/contexts/api/api-context';
import { mockAccountModel } from '@/domain/test';

type SutTypes = {
  history: Location;
};

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = window.location;
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" Component={jest.fn()} />
          </Route>
          <Route key="login" path="login" Component={jest.fn()} />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  );

  return {
    history,
  };
};

describe('PrivateRoute', () => {
  test('Should redirect to /login if token is empty', () => {
    const { history } = makeSut(null);
    expect(history.pathname).toBe('/login');
  });

  test('Should render current component if token is not empty', () => {
    const { history } = makeSut();
    expect(history.pathname).toBe('/login');
  });
});
