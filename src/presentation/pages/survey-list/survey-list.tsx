import Styles from './survey-list-styles.scss';
import { Header, Footer } from '@/presentation/components';
import {
  SurveyListItem,
  SurveyContext,
  SurveyError,
} from '@/presentation/pages/survey-list/components';
import { LoadSurveyList } from '@/domain/usecases';
import { AccessDeniedError } from '@/domain/errors';
import { ApiContext } from '@/presentation/contexts';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';

type Props = {
  loadSurveyList: LoadSurveyList;
};

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const navigate = useNavigate();
  const { setCurrentAccount } = useContext(ApiContext);
  const [state, setState] = useState({
    surveys: [] as LoadSurveyList.Model[],
    error: '',
    reload: false,
  });
  useEffect(() => {
    loadSurveyList
      .loadAll()
      .then((surveys) => {
        setState({ ...state, surveys });
      })
      .catch((error) => {
        if (error instanceof AccessDeniedError) {
          setCurrentAccount(undefined);
          navigate('/login', { replace: true });
        } else {
          setState({ ...state, error: error.message });
        }
      });
  }, [state.reload]);

  return (
    <div className={Styles.surveyListWrap}>
      <Header />
      <div className={Styles.contentWrap}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <SurveyError /> : <SurveyListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  );
};

export default SurveyList;
