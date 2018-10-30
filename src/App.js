import React from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';

import Header from './components/header';

import Reconocer from './pages/reconocer';
import Registrar from './pages/registrar';

const AppRouter = () => (
  <Router>
    <div>
      <Header />

      <Route path='/' exact component={Reconocer} />
      <Route path='/registrar' component={Registrar} />
    </div>
  </Router>
);

export default AppRouter;
