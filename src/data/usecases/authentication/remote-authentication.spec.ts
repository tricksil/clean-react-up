import { HttpPostClient } from 'data/protocols/http/http-post-client';
import { RemoteAuthentication } from './remote-authentication';
describe('RemoteAtuhentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    // Spy -> capture values to compare
    class HttpPostClientSpy implements HttpPostClient {
      url?: string;
      async post(url: string): Promise<void> {
        this.url = url;
        return Promise.resolve();
      }
    }
    const url = 'any_url';
    const httpPostClient = new HttpPostClientSpy();
    // sut -> system under test
    const sut = new RemoteAuthentication(url, httpPostClient);
    await sut.auth();
    expect(httpPostClient.url).toBe(url);
  });
});
