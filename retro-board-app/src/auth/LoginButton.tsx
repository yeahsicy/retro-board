import React, { useCallback, useState, useRef, useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useUser from './useUser';
import LoginModal from './LoginModal';
import useTranslation from '../translations/useTranslations';
import { logout } from '../api';
import UserContext from './Context';

const LoginButton = () => {
  const translations = useTranslation();
  const { setUser } = useContext(UserContext);
  const [modalOpened, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnchor = useRef(null);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openMenu = useCallback(() => setMenuOpen(true), []);

  const handleModalOpen = useCallback(
    (evt: React.MouseEvent<HTMLDivElement>) => {
      evt.stopPropagation();
      setModalOpen(true);
    },
    []
  );

  const handleModalClose = useCallback(() => {
    setModalOpen(false);
    setMenuOpen(false);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setUser(null);
  }, [setUser]);

  const user = useUser();
  if (user) {
    return (
      <div>
        <Avatar
          alt={user.name}
          src={user.photo!}
          onClick={openMenu}
          ref={menuAnchor}
        />
        <Menu
          anchorEl={menuAnchor.current}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={menuOpen}
          onClose={closeMenu}
        >
          <MenuItem onClick={handleLogout}>
            {translations.Header.logout}
          </MenuItem>
        </Menu>
      </div>
    );
  }
  return (
    <>
      <div onClick={handleModalOpen}>{translations.Login.header}</div>
      {modalOpened && <LoginModal onClose={handleModalClose} />}
    </>
  );
};

export default LoginButton;
