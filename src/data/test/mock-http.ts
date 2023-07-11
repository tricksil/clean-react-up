import { faker } from '@faker-js/faker';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';

export const objectElement = {
  [faker.word.sample()]: faker.word.interjection(),
  [faker.word.sample()]: faker.word.interjection(),
  [faker.word.sample()]: faker.word.interjection(),
};

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.helpers.arrayElement(['post', 'get', 'put', 'delete']),
  body: objectElement,
  headers: objectElement,
});

// Spy -> capture values to compare
export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;
  method?: string;
  body?: any;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.headers = data.headers;
    return Promise.resolve(this.response);
  }
}
