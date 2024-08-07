import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useGetClientDataQuery } from '../../redux/api/auth.js';
import { useUploadImageMutation, useCreatePostMutation } from '../../redux/api/posts.js';
import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [text, setText] = React.useState('');
  const [imageUrl, setImageUrl] = useState('');

  const { data: userData, isLoading: isUserDataLoading } = useGetClientDataQuery();
  const [uploadImage, { isLoading: isUploadLoading }] = useUploadImageMutation();
  const [triggerAddPost] = useCreatePostMutation();

  const imageRef = useRef();
  const navigate = useNavigate();

  const handleChangeFile = async (event) => {
    try {
      event.preventDefault();
      const selectedFile = event.target.files[0];
      const formData = new FormData();
      formData.append('image', selectedFile);

      uploadImage(formData)
        .unwrap()
        .then((response) => {
          setImageUrl(`http://localhost:3001${response.url}`);
        });
    } catch (error) {
      alert('Ошибка при загрузке изображения');
    }
  };

  const onClickRemoveImage = () => {};

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onTagChange = (event) => {
    setTags(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const newPost = {
      title,
      tags,
      text,
    };

    if (imageUrl) {
      newPost.imageUrl = imageUrl;
    }

    triggerAddPost(newPost)
      .unwrap()
      .then((response) => {
        console.log('response post', response);
        navigate('/');
      });
  };

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (isUserDataLoading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    navigate('/');
    return null;
  }

  return (
    <Paper style={{ padding: 30 }}>
      <form onSubmit={onSubmit}>
        <Button variant='outlined' size='large' onClick={() => imageRef.current?.click()}>
          Загрузить превью
        </Button>

        <input type='file' onChange={handleChangeFile} hidden ref={imageRef} />

        {imageUrl && (
          <Button variant='contained' color='error' onClick={onClickRemoveImage}>
            Удалить
          </Button>
        )}
        {imageUrl && <img className={styles.image} src={imageUrl} alt='Uploaded' />}

        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant='standard'
          placeholder='Заголовок статьи...'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
        />
        <TextField
          classes={{ root: styles.tags }}
          variant='standard'
          placeholder='Тэги'
          fullWidth
          onChange={onTagChange}
        />
        <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
        <div className={styles.buttons}>
          <Button size='large' variant='contained' type='submit'>
            Опубликовать
          </Button>
          <Link to='/'>
            <Button size='large'>Отмена</Button>
          </Link>
        </div>
      </form>
    </Paper>
  );
};
