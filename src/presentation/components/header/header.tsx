import Styles from './header-styles.scss';
import { Logo } from '@/presentation/components';
import { ApiContext } from '@/presentation/contexts';
import { useNavigate } from 'react-router-dom';
import React, { memo, useContext } from 'react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { setCurrentAccount } = useContext(ApiContext);

  const logout = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    setCurrentAccount(undefined);
    navigate('/login', { replace: true });
  };
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />

        <div className={Styles.logoutWrap}>
          <span>Patrick</span>
          <a onClick={logout} data-testid="logout" href="#">
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
