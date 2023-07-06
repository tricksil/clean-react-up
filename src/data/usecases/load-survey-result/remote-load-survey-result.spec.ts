import { RemoteLoadSurveyResult } from './remote-load-survey-result';
import { HttpGetClientSpy } from '@/data/test';
import { faker } from '@faker-js/faker';

type SutTypes = {
  sut: RemoteLoadSurveyResult;
  httpGetClientSpy: HttpGetClientSpy;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
  return {
    httpGetClientSpy,
    sut,
  };
};

describe('RemoteLoadSurveyResult', () => {
  test('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.load();

    expect(httpGetClientSpy.url).toBe(url);
  });
});
