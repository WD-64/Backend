import { BrowserRouter, Routes, Route } from 'react-router';
import { RootLayout, ProtectedLayout } from '@/layouts';
import { CreatePost, Home, Login, NotFound, Post, Register } from '@/pages';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='post/:id' element={<Post />} />
        <Route path='create' element={<ProtectedLayout />}>
          <Route index element={<CreatePost />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
