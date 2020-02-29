import React, { useCallback, useState, useRef, useContext } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AccountIcon from '@material-ui/icons/AccountCircle';
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
    (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
        <AvatarContainer onClick={openMenu} ref={menuAnchor}>
          <Avatar alt={user.name} src={user.photo!} />
          {user.name}
        </AvatarContainer>
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
      <Button
        onClick={handleModalOpen}
        variant="contained"
        color="secondary"
        startIcon={<AccountIcon />}
      >
        {translations.Login.header}
      </Button>
      {modalOpened && <LoginModal onClose={handleModalClose} />}
    </>
  );
};

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;

  > *:first-child {
    margin-right: 10px;
  }
`;

export default LoginButton;
