import React from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import CookieService from '../../services/cookieService';

export const Header = () => {
  const isAuth = Boolean(CookieService.getCookie('token'));

  const navigate = useNavigate();

  const onClickLogout = () => {
    CookieService.deleteCookie('token');
    navigate('/');
  };

  return (
    <div className={styles.root}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>
          <Link className={styles.logo} to='/'>
            <div>ARCHAKOV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to='/posts/create'>
                  <Button variant='contained'>Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant='contained' color='error'>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <Button variant='outlined'>Войти</Button>
                </Link>
                <Link to='/register'>
                  <Button variant='contained'>Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
