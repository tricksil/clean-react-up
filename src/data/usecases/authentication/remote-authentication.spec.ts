import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

// factory method
const makeSut = (url: string = 'any_url'): SutTypes => {
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
    const url = 'other_url';
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
