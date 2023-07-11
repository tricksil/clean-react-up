import * as Helpers from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /surveys/;
const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'GET');
};

const mockAccessDeniedError = (): void => {
  Http.mockForbiddenError(path, 'GET');
};

const mockSuccess = (delay?: number): void => {
  Http.mockOk({ url: path, method: 'GET', delay, fixture: 'survey-result' });
};

describe('SurveyResult', () => {
  beforeEach(() => {
    cy.fixture('account').then((account) => {
      Helpers.setLocalStorageItem('account', account);
    });
  });

  it('Should present error on UnexpectedError', () => {
    cy.visit('/surveys/any_id');
    mockUnexpectedError();
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    );
  });

  it('Should reload on button click', () => {
    cy.visit('/surveys/any_id');
    mockUnexpectedError();
    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    );
    mockSuccess();
    cy.getByTestId('reload').click();
    cy.getByTestId('question').should('exist');
  });

  it('Should logout on AccessDeniedError', () => {
    cy.visit('/surveys/any_id');
    mockAccessDeniedError();
    Helpers.testUrl('/login');
  });
});
