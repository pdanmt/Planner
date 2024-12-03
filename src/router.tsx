import { createBrowserRouter } from 'react-router-dom'
import { PageBase } from './layouts/base'
import { Home } from './pages/home'
import { Planner } from './pages/planner-accordion-page'
import { LoginPage } from './pages/login'
import { ErrorPage } from './pages/error-page'
import { NotFound } from './pages/not-found'

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <PageBase />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/planner',
        element: <Planner />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
