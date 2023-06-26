import { faker } from '@faker-js/faker';
import { SurveyModel } from '@/domain/models';

export const mockSurveyModel = (): SurveyModel => ({
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
  didAnswer: faker.datatype.boolean(),
});

export const mockSurveyListModel = (): SurveyModel[] => [
  mockSurveyModel(),
  mockSurveyModel(),
  mockSurveyModel(),
];
