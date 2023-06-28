import * as Helpers from '../support/helpers';
import * as Http from '../support/survey-list-mocks';
import { faker } from '@faker-js/faker';

describe('SurveyList', () => {
  beforeEach(() => {
    Helpers.setLocalStorageItem('account', {
      accessToken: faker.string.uuid(),
      name: faker.person.fullName(),
    });
    cy.visit('');
  });

  it('Should present error on UnexpectedError', () => {
    Http.mockUnexpectedError();

    cy.getByTestId('error').should(
      'contain.text',
      'Algo de errado aconteceu. Tente novamente em breve.'
    );
  });
});
