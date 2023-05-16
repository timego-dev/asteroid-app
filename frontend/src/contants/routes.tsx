import { DetailPage, HomePage } from '../pages';

export const ROUTES = {
  HOME: '/',
  DETAIL: '/neos/:id',
};

export const MAIN_ROUTES = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.DETAIL,
    element: <DetailPage />,
  },
];
