import { makeApiUrl } from '@/main/factories/http';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';
import { SaveSurveyResult } from '@/domain/usecases';
import { RemoteSaveSurveyResult } from '@/data/usecases';

export const makeRemoteSaveSurveyResult = (
  surveyId: string
): SaveSurveyResult => {
  return new RemoteSaveSurveyResult(
    makeApiUrl(`/surveys/${surveyId}/results`),
    makeAuthorizeHttpClientDecorator()
  );
};
