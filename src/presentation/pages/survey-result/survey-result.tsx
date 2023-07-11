import Styles from './survey-result-styles.scss';
import {
  Calendar,
  Error,
  Footer,
  Header,
  Loading,
} from '@/presentation/components';
import { useErrorHandler } from '@/presentation/hooks';
import { LoadSurveyResult } from '@/domain/usecases';
import { Flipped, Flipper } from 'react-flip-toolkit';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  loadSurveyResult: LoadSurveyResult;
};

const SurveyResult: React.FC<Props> = ({ loadSurveyResult }: Props) => {
  const handleError = useErrorHandler((error: Error) => {
    setState((old) => ({
      ...old,
      surveyResult: null,
      error: error.message,
    }));
  });
  const [state, setState] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
    reload: false,
  });
  const reload = (): void => {
    setState((old) => ({
      isLoading: false,
      surveyResult: null,
      error: '',
      reload: !old.reload,
    }));
  };
  const navigate = useNavigate();

  useEffect(() => {
    loadSurveyResult
      .load()
      .then((surveyResult) => {
        setState((old) => ({
          ...old,
          surveyResult,
        }));
      })
      .catch(handleError);
  }, [state.reload]);

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
            <button
              data-testid="back-button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Voltar
            </button>
          </>
        )}
      </div>
      {state.isLoading && <Loading />}
      {state.error && <Error error={state.error} reload={reload} />}
      <Footer />
    </div>
  );
};

export default SurveyResult;
