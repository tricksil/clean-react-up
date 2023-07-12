import { faker } from '@faker-js/faker';
import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases';

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  answer: faker.word.words(10),
});

export const mockSurveyResultModel = (): LoadSurveyResult.Model => ({
  question: faker.word.words(10),
  date: faker.date.recent(),
  answers: [
    {
      image: faker.internet.url(),
      answer: faker.word.words(),
      count: faker.number.int(),
      percent: faker.number.int(100),
      isCurrentAccountAnswer: true,
    },
    {
      answer: faker.word.words(),
      count: faker.number.int(),
      percent: faker.number.int(100),
      isCurrentAccountAnswer: false,
    },
  ],
});

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount = 0;
  surveyResult = mockSurveyResultModel();
  async load(): Promise<LoadSurveyResult.Model> {
    this.callsCount++;
    return this.surveyResult;
  }
}
