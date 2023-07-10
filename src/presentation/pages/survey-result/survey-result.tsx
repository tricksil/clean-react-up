import Styles from './survey-result-styles.scss';
import {
  Calendar,
  Error,
  Footer,
  Header,
  Loading,
} from '@/presentation/components';
import { LoadSurveyResult } from '@/domain/usecases';
import { Flipped, Flipper } from 'react-flip-toolkit';
import React, { useEffect, useState } from 'react';

type Props = {
  loadSurveyResult: LoadSurveyResult;
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
  });

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => {
        setState((old) => ({
          ...old,
          surveyResult,
        }));
      })
      .catch();
  }, []);

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar
                date={state.surveyResult.date}
                className={Styles.calendarWrap}
              />
              <h2 data-testid="question">{state.surveyResult.question}</h2>
            </hgroup>
            <Flipper flipKey="answers">
              <ul data-testid="answers" className={Styles.answerList}>
                {state.surveyResult.answers.map((answer) => (
                  <Flipped key={answer.answer} flipId={answer.answer}>
                    <li
                      data-testid="answer-wrap"
                      className={
                        answer.isCurrentAccountAnswer ? Styles.active : ''
                      }
                    >
                      {answer.image && (
                        <img
                          data-testid="image"
                          src={answer.image}
                          alt={answer.answer}
                        />
                      )}
                      <span data-testid="answer" className={Styles.answer}>
                        {answer.answer}
                      </span>
                      <span data-testid="percent" className={Styles.percent}>
                        {answer.percent}%
                      </span>
                    </li>
                  </Flipped>
                ))}
              </ul>
            </Flipper>
            <button>Voltar</button>
          </>
        )}
      </div>
      {state.isLoading && <Loading />}
      {state.error && <Error error={state.error} reload={() => {}} />}
      <Footer />
    </div>
  );
};

export default SurveyResult;
