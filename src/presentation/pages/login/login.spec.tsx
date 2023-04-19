import React from 'react';
import {
  RenderResult,
  render,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { faker } from '@faker-js/faker';

import { Login } from '@/presentation/pages';
import {
  AuthenticationSpy,
  SaveAccessTokenMock,
  ValidationStub,
} from '@/presentation/test';
import { InvalidCredentialsError } from '@/domain/errors';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

type SutTypes = {
  sut: RenderResult;
  authenticationSpy: AuthenticationSpy;
  saveAccessTokenMock: SaveAccessTokenMock;
};

type SutParams = {
  validationError: string;
};
const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationStub.errorMessage = params?.validationError;

  const sut = render(
    <Router location={history.location} navigator={history}>
      <Login
        validation={validationStub}
        authentication={authenticationSpy}
        saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock,
  };
};

const simulateValidSumbmit = async (
  sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateEmailFiled(sut, email);
  populatePasswordFiled(sut, password);
  const form = sut.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
};

const populateEmailFiled = (
  sut: RenderResult,
  email = faker.internet.email()
): void => {
  const emailInput = sut.getByTestId('email');
  fireEvent.input(emailInput, {
    target: { value: email },
  });
};

const populatePasswordFiled = (
  sut: RenderResult,
  password = faker.internet.password()
): void => {
  const passwordInput = sut.getByTestId('password');
  fireEvent.input(passwordInput, {
    target: { value: password },
  });
};

const testStatusForField = (
  sut: RenderResult,
  fieldName: string,
  validationError?: string
): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || 'Tudo certo!');
  expect(emailStatus.textContent).toBe(validationError ? '🔴' : '🟢');
};

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId('error-wrap');
  expect(errorWrap.childElementCount).toBe(count);
};

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName);
  expect(el).toBeTruthy();
};

const testElementText = (
  sut: RenderResult,
  fieldName: string,
  text: string
): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.textContent).toBe(text);
};

const testButtonIsDisabled = (
  sut: RenderResult,
  fieldName: string,
  isDisabled: boolean
): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisabled);
};

describe('Login Component', () => {
  afterEach(cleanup);

  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    testErrorWrapChildCount(sut, 0);
    testButtonIsDisabled(sut, 'submit', true);
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError);
  });

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populateEmailFiled(sut);
    testStatusForField(sut, 'email', validationError);
  });

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({ validationError });
    populatePasswordFiled(sut);
    testStatusForField(sut, 'password', validationError);
  });

  test('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut();
    populateEmailFiled(sut);
    testStatusForField(sut, 'email');
  });

  test('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut();
    populatePasswordFiled(sut);
    testStatusForField(sut, 'password');
  });

  test('Should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailFiled(sut);
    populatePasswordFiled(sut);
    testButtonIsDisabled(sut, 'submit', false);
  });

  test('Should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSumbmit(sut);
    testElementExists(sut, 'spinner');
  });

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSumbmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  test('Should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSumbmit(sut);
    await simulateValidSumbmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({ validationError });
    await simulateValidSumbmit(sut);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('Should present error if Authencation fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest
      .spyOn(authenticationSpy, 'auth')
      .mockReturnValueOnce(Promise.reject(error));
    await simulateValidSumbmit(sut);
    testElementText(sut, 'main-error', error.message);
    testErrorWrapChildCount(sut, 1);
  });

  test('Should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();

    await simulateValidSumbmit(sut);
    expect(saveAccessTokenMock.accessToken).toBe(
      authenticationSpy.account.accessToken
    );
    expect(history.location.pathname).toBe('/');
  });

  test('Should go to signup page', async () => {
    const { sut } = makeSut();
    const register = sut.getByTestId('signup');
    fireEvent.click(register);
    expect(history.location.pathname).toBe('/signup');
  });
});
