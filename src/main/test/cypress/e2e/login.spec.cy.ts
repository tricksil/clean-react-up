import * as FormHelpers from '../support/form-helpers';
import * as Helpers from '../support/helpers';
import * as Http from '../support/login-mocks';

import { faker } from '@faker-js/faker';

const populateFields = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email());
  cy.getByTestId('password').focus().type(faker.internet.password());
};
const simulateValidSubmit = (): void => {
  populateFields();
  cy.getByTestId('submit').click();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly');
    FormHelpers.testInputStatus('email', 'Campo obrigatório');
    cy.getByTestId('password').should('have.attr', 'readOnly');
    FormHelpers.testInputStatus('password', 'Campo obrigatório');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    FormHelpers.testInputStatus('email', 'Valor inválido');
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3));
    FormHelpers.testInputStatus('password', 'Valor inválido');
    cy.getByTestId('submit').should('have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    FormHelpers.testInputStatus('email');
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5));
    FormHelpers.testInputStatus('password');
    cy.getByTestId('submit').should('not.have.attr', 'disabled');
    cy.getByTestId('error-wrap').should('not.have.descendants');
  });

  it('Should present InvalidCredentialsError on 401', () => {
    Http.mockInvalidCredentialsError();
    simulateValidSubmit();
    FormHelpers.testMainError('Credenciais inválidas');
    Helpers.testUrl('/login');
  });

  it('Should present UnexpectedError on default error cases', () => {
    Http.mockUnexpectedError();
    simulateValidSubmit();
    FormHelpers.testMainError(
      'Algo de errado aconteceu. Tente novamente em breve.'
    );
    Helpers.testUrl('/login');
  });

  it('Should present save account if valid credentials are provided', () => {
    Http.mockOk(100);
    simulateValidSubmit();
    cy.getByTestId('error-wrap').should('not.have.descendants');
    Helpers.testUrl('/');
    Helpers.testLocalStarageItem('account');
  });

  it('Should present multiple submits', () => {
    Http.mockOk(100);
    populateFields();
    cy.getByTestId('submit').click();
    cy.getByTestId('submit').click();
    Helpers.testHttpCallsCount(1);
  });

  it('Should not call submit if form is invalid', () => {
    Http.mockOk();
    cy.getByTestId('email')
      .focus()
      .type(faker.internet.email())
      .type('{enter}');
    Helpers.testHttpCallsCount(0);
  });
});
