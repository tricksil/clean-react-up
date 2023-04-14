import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from '@/presentation/components';
import '@/presentation/styles/global.scss';

const root = ReactDOM.createRoot(document.getElementById('main'));

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
