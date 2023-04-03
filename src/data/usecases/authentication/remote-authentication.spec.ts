import { RemoteAuthentication } from './remote-authentication';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { mockAuthencation } from '@/domain/test/mock-authentication';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

// factory method
const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
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
    const authencationParams = mockAuthencation();
    const { sut, httpPostClientSpy } = makeSut();
    await sut.auth(authencationParams);
    expect(httpPostClientSpy.body).toEqual(authencationParams);
  });
});
