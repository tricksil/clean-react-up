import * as Http from './http-mocks';

export const mockUnexpectedError = (): void => {
  Http.mockServerError(/survey/, 'GET');
};

export const mockAccessDeniedError = (): void => {
  Http.mockForbiddenError(/survey/, 'GET');
};
