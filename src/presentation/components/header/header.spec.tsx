import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Header } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory({ initialEntries: ['/'] });
describe('Header Component', () => {
  test('Should call setCurrentAccount with null', () => {
    const setCurrentAccountMock = jest.fn();
    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router location={history.location} navigator={history}>
          <Header />
        </Router>
      </ApiContext.Provider>
    );
    fireEvent.click(screen.getByTestId('logout'));
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
    expect(history.location.pathname).toBe('/login');
  });
});
