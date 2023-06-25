import { faker } from '@faker-js/faker';
import * as Helper from './http-mocks';

export const mockEmailInUseError = (): void => {
  Helper.mockEmailInUseError(/signup/);
};

export const mockUnexpectedError = (): void => {
  Helper.mockUnexpectedError(/signup/, 'POST');
};

export const mockInvalidData = (): void => {
  Helper.mockOk(/signup/, 'POST', {
    invalid: faker.string.uuid(),
  });
};

export const mockOk = (delay?: number): void => {
  Helper.mockOk(
    /signup/,
    'POST',
    {
      accessToken: faker.string.uuid(),
      name: faker.person.firstName(),
    },
    delay
  );
};
