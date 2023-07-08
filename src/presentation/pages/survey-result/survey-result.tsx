import Styles from './survey-result-styles.scss';
import { Calendar, Footer, Header, Loading } from '@/presentation/components';
import { Flipped, Flipper } from 'react-flip-toolkit';
import React from 'react';

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        {false && (
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
      {false && <Loading />}
      <Footer />
    </div>
  );
};

export default SurveyResult;
