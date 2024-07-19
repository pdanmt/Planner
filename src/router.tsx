import { createBrowserRouter } from 'react-router-dom'
import { PageBase } from './layouts/base'
import { AddElementInSchedule } from './pages/form-add-in-schedule'
import { EverythingOnSchedule } from './pages/schedule-page'
import { Schedule } from './pages/schedule-accordion-page'

export const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <PageBase />,
    children: [
      {
        path: '/',
        element: <AddElementInSchedule />,
      },
      {
        path: '/everything-on-schedule',
        element: <EverythingOnSchedule />,
      },
      {
        path: '/schedule',
        element: <Schedule />,
      },
    ],
  },
])
