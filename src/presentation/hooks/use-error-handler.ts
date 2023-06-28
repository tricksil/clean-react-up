import { useLogout } from '@/presentation/hooks';
import { AccessDeniedError } from '@/domain/errors';

type CallBackType = (error: Error) => void;
type ResulType = CallBackType;

export const useErrorHandler = (callback: CallBackType): ResulType => {
  const logout = useLogout();
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      logout();
    } else {
      callback(error);
    }
  };
};
