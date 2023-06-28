import { ApiContext } from '@/presentation/contexts';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

type ResulType = () => void;

export const useLogout = (): ResulType => {
  const navigate = useNavigate();
  const { setCurrentAccount } = useContext(ApiContext);
  return (): void => {
    setCurrentAccount(undefined);
    navigate('/login', { replace: true });
  };
};
