import { faker } from '@faker-js/faker';
import * as Helper from '../support/http-mocks';

export const mockInvalidCredentialsError = (): void => {
  Helper.mockInvalidCredentialsError(/login/);
};
export const mockUnexpectedError = (): void => {
  Helper.mockUnexpectedError(/login/, 'POST');
};
export const mockOk = (delay?: number): void => {
  Helper.mockOk(
    /login/,
    'POST',
    {
      accessToken: faker.datatype.uuid(),
    },
    delay
  );
};
export const mockInvalidData = (): void => {
  Helper.mockOk(/login/, 'POST', {
    invalid: faker.datatype.uuid(),
  });
};
