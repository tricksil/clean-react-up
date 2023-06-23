import { faker } from '@faker-js/faker';
import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: {
    [faker.word.sample()]: faker.word.interjection(),
    [faker.word.sample()]: faker.word.interjection(),
    [faker.word.sample()]: faker.word.interjection(),
  },
});

// Spy -> capture values to compare
export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string;
  body?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}

// Spy -> capture values to compare
export class HttpGetClientSpy implements HttpGetClient {
  url: string;
  async get(params: HttpGetParams): Promise<void> {
    this.url = params.url;
  }
}
