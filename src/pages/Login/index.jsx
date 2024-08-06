import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import styles from './Login.module.scss';
import { useLazyLoginQuery } from '../../redux/api/auth.js';
import CookieService from '../../services/cookieService';

export const Login = () => {
  const [triggerLogin, { isLoading, isError }] = useLazyLoginQuery();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'asdasd@gmail.com',
      password: 'testpass123',
    },
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    triggerLogin(data)
      .unwrap()
      .then((response) => {
        CookieService.setCookie('token', response.token);
        navigate('/');
      });
  };

  return (
    <Paper classes={{ root: styles.root }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography classes={{ root: styles.title }} variant='h5'>
          Вход в аккаунт
        </Typography>
        <TextField
          className={styles.field}
          label='E-Mail'
          type='email'
          error={Boolean(errors?.email?.message)}
          helperText={errors?.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label='Пароль'
          fullWidth
          error={Boolean(errors?.password?.message)}
          helperText={errors?.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
        />
        <Button size='large' variant='contained' fullWidth type='submit'>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
