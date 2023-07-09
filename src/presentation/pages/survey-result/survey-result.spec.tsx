import { SurveyResult } from '@/presentation/pages';
import { ApiContext } from '@/presentation/contexts';
import { mockAccountModel } from '@/domain/test';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
const history = createMemoryHistory();
describe('SurveyResult', () => {
  test('Should present correct inital state', async () => {
    render(
      <ApiContext.Provider
        value={{
          setCurrentAccount: jest.fn(),
          getCurrentAccount: () => mockAccountModel(),
        }}
      >
        <Router location={history.location} navigator={history}>
          <SurveyResult />
        </Router>
      </ApiContext.Provider>
    );
    const surveyResult = screen.getByTestId('survey-result');
    expect(surveyResult.childElementCount).toBe(0);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
  });
});
