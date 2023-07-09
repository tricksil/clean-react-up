import Styles from './list-styles.scss';
import {
  SurveyItem,
  SurveyItemEmpty,
} from '@/presentation/pages/survey-list/components';
import { LoadSurveyList } from '@/domain/usecases';
import React from 'react';

type Props = {
  surveys: LoadSurveyList.Model[];
};

const List: React.FC<Props> = ({ surveys }: Props) => {
  return (
    <ul data-testid="survey-list" className={Styles.listWrap}>
      {surveys.length ? (
        surveys.map((survey: LoadSurveyList.Model) => (
          <SurveyItem key={survey.id} survey={survey} />
        ))
      ) : (
        <SurveyItemEmpty />
      )}
    </ul>
  );
};

export default List;
