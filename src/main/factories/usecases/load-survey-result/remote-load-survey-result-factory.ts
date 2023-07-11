import { makeApiUrl } from '@/main/factories/http';
import { LoadSurveyResult } from '@/domain/usecases';
import { RemoteLoadSurveyResult } from '@/data/usecases';
import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators';

export const makeRemoteLoadSurveyResult = (
  surveyId: string
): LoadSurveyResult => {
  return new RemoteLoadSurveyResult(
    makeApiUrl(`/surveys/${surveyId}/results`),
    makeAuthorizeHttpGetClientDecorator()
  );
};
