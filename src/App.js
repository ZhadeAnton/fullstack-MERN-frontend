import Container from '@mui/material/Container';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/post/:id' element={<FullPost />} />
          <Route path='/add-post' element={<AddPost />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          {/* <Route path="*" element={<NotFound />} /> */}
          {/* <Route path="*" element={<Redirect to="/" />} /> */}
        </Routes>
      </Container>
    </>
  );
}

export default App;
