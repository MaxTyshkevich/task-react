import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../../pages/Layout/Layout';
import PostsPage from '../../pages/PostsPage/PostsPage';
import PostDetailsPage from '../../pages/PostDetailsPage/PostDetailsPage';
import AdminPage from '../../pages/AdminPage/AdminPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import UsersPage from '../../pages/UsersPage/UsersPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';

import SignInPage from '../../pages/SignInPage/SignInPage';
import RequireAuth from './RequireAuth';
import { UserRole } from '../../store/types';
import ForbiddenPage from '../../pages/ForbiddenPage/ForbiddenPage';
import WelcomPage from '../../pages/WelcomPage/WelcomPage';
import FavoritesPage from '../../pages/FavoritesPage/FavoritesPage';
import { PublicAuth } from './PublicAuth';

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: 'forbidden',
          element: <ForbiddenPage />,
        },
        {
          element: <PublicAuth />,
          children: [
            {
              index: true,
              element: <WelcomPage />,
            },
            {
              path: 'sign-in',
              element: <SignInPage />,
            },
          ],
        },

        {
          element: <RequireAuth />,
          children: [
            {
              path: 'posts',
              element: <PostsPage />,
            },
            {
              path: 'profile/:profileId',
              element: <ProfilePage />,
            },
            {
              path: 'users',
              element: <UsersPage />,
            },
            {
              path: 'favorites',
              element: <FavoritesPage />,
            },
            {
              path: 'post/:id',
              element: <PostDetailsPage />,
            },
          ],
        },
        {
          element: <RequireAuth roles={[UserRole.ADMIN]} />,
          children: [
            {
              path: 'admin',
              element: <AdminPage />,
            },
          ],
        },
      ],
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);
