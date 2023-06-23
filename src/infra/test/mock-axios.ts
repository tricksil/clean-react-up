import axios from 'axios';
import { faker } from '@faker-js/faker';

export const mockHttpResponse = (): any => ({
  data: {
    [faker.word.sample()]: faker.word.interjection(),
    [faker.word.sample()]: faker.word.interjection(),
    [faker.word.sample()]: faker.word.interjection(),
  },
  status: faker.string.numeric(),
});

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.post.mockClear().mockResolvedValue(mockHttpResponse());
  mockedAxios.get.mockClear().mockResolvedValue(mockHttpResponse());

  return mockedAxios;
};
