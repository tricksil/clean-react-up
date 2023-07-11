import * as Helpers from '../utils/helpers';
import * as Http from '../utils/http-mocks';

const path = /surveys/;
const mockUnexpectedError = (): void => {
  Http.mockServerError(path, 'GET');
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
});
