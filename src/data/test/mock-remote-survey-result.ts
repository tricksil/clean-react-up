import { RemoteLoadSurveyResult } from '@/data/usecases';
import { faker } from '@faker-js/faker';

export const mockRemoteSurveyResultModel =
  (): RemoteLoadSurveyResult.Model => ({
    question: faker.word.words(10),
    date: faker.date.recent().toISOString(),
    answers: [
      {
        image: faker.internet.url(),
        answer: faker.word.words(),
        count: faker.number.int(),
        percent: faker.number.float(100),
        isCurrentAccountAnswer: faker.datatype.boolean(),
      },
      {
        answer: faker.word.words(),
        count: faker.number.int(),
        percent: faker.number.float(100),
        isCurrentAccountAnswer: faker.datatype.boolean(),
      },
    ],
  });
