import { makeApiUrl } from '@/main/factories/http';
import { LoadSurveyResult } from '@/domain/usecases';
import { RemoteLoadSurveyResult } from '@/data/usecases';
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/decorators';

export const makeRemoteLoadSurveyResult = (
  surveyId: string
): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${surveyId}/results`),
    makeAuthorizeHttpClientDecorator()
  );
};
