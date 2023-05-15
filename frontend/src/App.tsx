import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { MAIN_ROUTES } from './contants';

const App = () => {
  return (
    <Routes>
      {MAIN_ROUTES.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
};

export default App;
