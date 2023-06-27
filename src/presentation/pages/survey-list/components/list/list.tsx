import Styles from './list-styles.scss';
import {
  SurveyContext,
  SurveyItem,
  SurveyItemEmpty,
} from '@/presentation/pages/survey-list/components';
import { LoadSurveyList } from '@/domain/usecases';
import React, { useContext } from 'react';

const List: React.FC = () => {
  const { state } = useContext(SurveyContext);
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {state.surveys.length ? (
        state.surveys.map((survey: LoadSurveyList.Model) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  );
};

export default List;
