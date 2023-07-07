import Styles from './survey-result-styles.scss';
import { Footer, Header, Spinner } from '@/presentation/components';
import { Flipped, Flipper } from 'react-flip-toolkit';
import React from 'react';

const SurveyResult: React.FC = () => {
  return (
    <div className={Styles.surveyResultWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Qual é seu framework web favorito?</h2>
        <Flipper flipKey="answers">
          <ul className={Styles.answerList}>
            <Flipped flipId="ReactJS">
              <li className={Styles.active}>
                <img src="https://ionicframework.com/docs/icons/logo-react-icon.png" />
                <span className={Styles.answer}>ReactJS</span>
                <span className={Styles.percent}>50%</span>
              </li>
            </Flipped>
          </ul>
        </Flipper>
        <button>Voltar</button>
        <div className={Styles.loadingWrap}>
          <div className={Styles.loading}>
            <span>Aguarde...</span>
            <Spinner isNegative={true} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyResult;
