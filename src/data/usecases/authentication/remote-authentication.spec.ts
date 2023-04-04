import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';
import { mockAuthencation } from '@/domain/test/mock-authentication';
import { UnexpectedError } from '@/domain/errors/unexpected-error copy';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { AccountModel } from '@/domain/models/account-model';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

// factory method
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AuthenticationParams,
    AccountModel
  >();
  // sut -> system under test
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe('RemoteAtuhentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthencation());
    expect(httpPostClientSpy.url).toBe(url);
  });

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authencationParams = mockAuthencation();
    await sut.auth(authencationParams);
    expect(httpPostClientSpy.body).toEqual(authencationParams);
  });

  test('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized,
    };
    const promise = sut.auth(mockAuthencation());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthencation());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.auth(mockAuthencation());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  test('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(mockAuthencation());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
