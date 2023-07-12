import Styles from './result-styles.scss';
import { Calendar } from '@/presentation/components';
import { SurveyResultAnswer } from '@/presentation/pages/survey-result/components';
import { LoadSurveyResult } from '@/domain/usecases';
import { Flipper } from 'react-flip-toolkit';
import { useNavigate } from 'react-router-dom';
import React from 'react';

type Props = {
  surveyResult: LoadSurveyResult.Model;
};

const Result: React.FC<Props> = ({ surveyResult }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <hgroup>
        <Calendar date={surveyResult.date} className={Styles.calendarWrap} />
        <h2 data-testid="question">{surveyResult.question}</h2>
      </hgroup>
      <Flipper flipKey={surveyResult}>
        <ul data-testid="answers" className={Styles.answerList}>
          {surveyResult.answers.map((answer) => (
            <SurveyResultAnswer key={answer.answer} answer={answer} />
          ))}
        </ul>
      </Flipper>
      <button
        className={Styles.button}
        data-testid="back-button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Voltar
      </button>
    </>
  );
};

export default Result;
