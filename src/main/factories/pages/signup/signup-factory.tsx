import React from 'react';
import { makeRemoteAddAccount } from '@/main/factories/usecases';
import { makeSignUpValidation } from './signup-validation-factory';
import { SignUp } from '@/presentation/pages';

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  );
};
