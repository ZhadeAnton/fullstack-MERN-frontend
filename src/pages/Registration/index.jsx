import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { useLazyRegisterQuery } from '../../redux/api/auth';
import styles from './Login.module.scss';
import CookieService from '../../services/cookieService';

export const Registration = () => {
  const [triggerRegistration, { isLoading, isError }] = useLazyRegisterQuery();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullname: 'Вася Пупкин',
      email: 'test@example.com',
      password: '1234',
    },
    mode: 'onChange',
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    triggerRegistration(data)
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
          Создание аккаунта
        </Typography>
        <div className={styles.avatar}>
          <Avatar sx={{ width: 100, height: 100 }} />
        </div>
        <TextField
          className={styles.field}
          label='Полное имя'
          fullWidth
          error={Boolean(errors?.fullname?.message)}
          helperText={errors?.fullname?.message}
          {...register('fullname', { required: 'Укажите ФИО' })}
        />
        <TextField
          className={styles.field}
          label='E-Mail'
          type='email'
          fullWidth
          error={Boolean(errors?.email?.message)}
          helperText={errors?.email?.message}
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField
          className={styles.field}
          label='Пароль'
          type='password'
          fullWidth
          error={Boolean(errors?.password?.message)}
          helperText={errors?.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
        />
        <Button size='large' variant='contained' fullWidth type='submit' disabled={!isValid}>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
