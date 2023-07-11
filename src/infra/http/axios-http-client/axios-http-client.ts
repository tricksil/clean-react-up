import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';
import axios, { AxiosResponse } from 'axios';

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.request({
        method: data.method,
        url: data.url,
        data: data.body,
        headers: data.headers,
      });
    } catch (error) {
      axiosResponse = error.response;
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
