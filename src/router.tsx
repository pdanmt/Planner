import { createBrowserRouter } from 'react-router-dom'
import { PageBase } from './layouts/base'
import { Home } from './pages/home'
import { Planner } from './pages/planner-accordion-page'
import { LoginPage } from './pages/login'

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <PageBase />,
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
  },
])
