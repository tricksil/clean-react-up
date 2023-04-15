import React, { useContext } from 'react';
import Styles from './form-status-styles.scss';
import Spinner from '@/presentation/components/spinner/spinner';
import Context from '@/presentation/contexts/form/form-context';

const FormStatus: React.FC = () => {
  const { state, errorState } = useContext(Context);
  const { isLoading } = state;
  const { main } = errorState;
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {main && <span className={Styles.error}>{main}</span>}
    </div>
  );
};

export default FormStatus;
