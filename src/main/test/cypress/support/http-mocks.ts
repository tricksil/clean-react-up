import { faker } from '@faker-js/faker';

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.intercept(
    { method: 'POST', url },
    {
      statusCode: 401,
      body: {
        error: faker.random.words(),
      },
    }
  ).as('request');
};

export const mockEmailInUseError = (url: RegExp): void => {
  cy.intercept(
    { method: 'POST', url },
    {
      statusCode: 403,
      body: {
        error: faker.random.words(),
      },
    }
  ).as('request');
};

export const mockUnexpectedError = (url: RegExp, method: string): void => {
  cy.intercept(
    { method, url },
    {
      statusCode: faker.helpers.arrayElement([400, 404, 500]),
      body: {
        error: faker.random.words(),
      },
    }
  ).as('request');
};

export const mockOk = (
  url: RegExp,
  method: string,
  body: any,
  delay?: number
): void => {
  cy.intercept(
    { method, url },
    {
      delay,
      statusCode: 200,
      body,
    }
  ).as('request');
};
