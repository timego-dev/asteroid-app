import { HomePage } from '../pages';

export const ROUTES = {
  HOME: '/',
};

export const MAIN_ROUTES = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
];
