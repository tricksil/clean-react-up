import { faker } from '@faker-js/faker';
import { RemoteLoadSurveyList } from '@/data/usecases';

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.string.uuid(),
  question: faker.word.words(10),
  didAnswer: faker.datatype.boolean(),
  date: faker.date.recent().toISOString(),
});

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
];
