import Styles from './header-styles.scss';
import { Logo } from '@/presentation/components';
import { useLogout } from '@/presentation/hooks';
import { ApiContext } from '@/presentation/contexts';
import React, { memo, useContext } from 'react';

const Header: React.FC = () => {
  const logout = useLogout();
  const { getCurrentAccount } = useContext(ApiContext);

  const buttonClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    logout();
  };
  return (
    <header className={Styles.headerWrap}>
      <div className={Styles.headerContent}>
        <Logo />

        <div className={Styles.logoutWrap}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a onClick={buttonClick} data-testid="logout" href="#">
            Sair
          </a>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
