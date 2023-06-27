import { faker } from '@faker-js/faker';
import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';

const objectElement = {
  [faker.word.sample()]: faker.word.interjection(),
  [faker.word.sample()]: faker.word.interjection(),
  [faker.word.sample()]: faker.word.interjection(),
};

export const mockPostRequest = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: objectElement,
});

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: objectElement,
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
export class HttpGetClientSpy<R> implements HttpGetClient<R> {
  url: string;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async get(params: HttpGetParams): Promise<HttpResponse<R>> {
    this.url = params.url;

    return this.response;
  }
}
