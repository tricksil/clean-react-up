import { faker } from '@faker-js/faker';

export const mockUnauthorizedError = (url: RegExp): void => {
  cy.intercept(
    { method: 'POST', url },
    {
      statusCode: 401,
      body: {
        error: faker.word.words(),
      },
    }
  ).as('request');
};

export const mockForbiddenError = (url: RegExp, method: string): void => {
  cy.intercept(
    { method: 'POST', url },
    {
      statusCode: 403,
      body: {
        error: faker.word.words(),
      },
    }
  ).as('request');
};

export const mockServerError = (url: RegExp, method: string): void => {
  cy.intercept(
    { method, url },
    {
      statusCode: faker.helpers.arrayElement([400, 404, 500]),
      body: {
        error: faker.word.words(),
      },
    }
  ).as('request');
};

type MockOkType = {
  url: RegExp;
  method: string;
  body?: any;
  fixture?: any;
  delay?: number;
};

export const mockOk = ({
  url,
  method,
  body,
  fixture,
  delay,
}: MockOkType): void => {
  console.log('body', body);
  cy.intercept(
    { method, url },
    {
      delay,
      statusCode: 200,
      body,
      fixture,
    }
  ).as('request');
};
