import { ApiContext } from '@/presentation/contexts';
import { AccessDeniedError } from '@/domain/errors';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

type CallBackType = (error: Error) => void;
type ResulType = CallBackType;

export const useErrorHandler = (callback: CallBackType): ResulType => {
  const navigate = useNavigate();
  const { setCurrentAccount } = useContext(ApiContext);
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined);
      navigate('/login', { replace: true });
    } else {
      callback(error);
    }
  };
};
