import Styles from './answer-styles.scss';
import { Flipped } from 'react-flip-toolkit';
import React from 'react';
import { SurveyResultAnswerModel } from '@/domain/models';

type Props = {
  answer: SurveyResultAnswerModel;
};

const Answer: React.FC<Props> = ({ answer }: Props) => {
  const activeClassName = answer.isCurrentAccountAnswer ? Styles.active : '';
  return (
    <Flipped flipId={answer.answer}>
      <li
        data-testid="answer-wrap"
        className={[Styles.answerWrap, activeClassName].join(' ')}
      >
        {answer.image && (
          <img data-testid="image" src={answer.image} alt={answer.answer} />
        )}
        <span data-testid="answer" className={Styles.answer}>
          {answer.answer}
        </span>
        <span data-testid="percent" className={Styles.percent}>
          {answer.percent}%
        </span>
      </li>
    </Flipped>
  );
};

export default Answer;
