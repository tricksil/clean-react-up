import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '@/presentation/components';
import '@/presentation/styles/global.scss';
import { makeLogin } from './factories/pages/login/login-factory';
import { makeSignUp } from './factories/pages/signup/signup-factory';

const root = ReactDOM.createRoot(document.getElementById('main'));

root.render(
  <React.StrictMode>
    <Router makeLogin={makeLogin} makeSignUp={makeSignUp} />
  </React.StrictMode>
);
