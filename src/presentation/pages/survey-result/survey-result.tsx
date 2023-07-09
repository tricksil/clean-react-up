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
  const [state] = useState({
    isLoading: false,
    error: '',
    surveyResult: null as LoadSurveyResult.Model,
  });

  useEffect(() => {
    loadSurveyResult.load().then().catch();
  }, []);

  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div data-testid="survey-result" className={Styles.contentWrap}>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={Styles.calendarWrap} />
              <h2>
                Qual é seu framework web favorito? Qual é seu framework web
                favorito?
              </h2>
            </hgroup>
            <Flipper flipKey="answers">
              <ul className={Styles.answerList}>
                <Flipped flipId="ReactJS">
                  <li className={Styles.active}>
                    <img src="https://ionicframework.com/docs/icons/logo-react-icon.png" />
                    <span className={Styles.answer}>ReactJS</span>
                    <span className={Styles.percent}>50%</span>
                  </li>
                </Flipped>
                <Flipped flipId="ReactJS">
                  <li>
                    <img src="https://ionicframework.com/docs/icons/logo-react-icon.png" />
                    <span className={Styles.answer}>ReactJS</span>
                    <span className={Styles.percent}>50%</span>
                  </li>
                </Flipped>
                <Flipped flipId="ReactJS">
                  <li>
                    <img src="https://ionicframework.com/docs/icons/logo-react-icon.png" />
                    <span className={Styles.answer}>ReactJS</span>
                    <span className={Styles.percent}>50%</span>
                  </li>
                </Flipped>
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
