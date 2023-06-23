import { faker } from '@faker-js/faker';
import { SurveyModel } from '@/domain/models';

export const mockSurveyList = (): SurveyModel[] => [
  {
    id: faker.string.uuid(),
    question: faker.word.words(10),
    answers: [
      {
        answer: faker.word.words(4),
        image: faker.internet.url(),
      },
      {
        answer: faker.word.words(4),
      },
    ],
    date: faker.date.recent(),
    didAnswer: false,
  },
];
