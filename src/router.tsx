import { createBrowserRouter } from 'react-router-dom'
import { PageBase } from './layouts/base'
import { AddElementInPlanner } from './pages/form-add-in-planner'
import { EverythingOnPlanner } from './pages/planner-page'
import { Planner } from './pages/planner-accordion-page'

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <PageBase />,
    children: [
      {
        path: '/',
        element: <AddElementInPlanner />,
      },
      {
        path: '/everything-on-planner',
        element: <EverythingOnPlanner />,
      },
      {
        path: '/planner',
        element: <Planner />,
      },
    ],
  },
])
