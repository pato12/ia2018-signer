import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

export default () => (
  <header>
    <nav className='container'>
      <h1>Reconocedor de Firmas</h1>
      <div className='nav-item'>
        <Link to='/'>Reconocer firma</Link>
      </div>
      <div className='nav-item'>
        <Link to='/registrar'>Registrar firma</Link>
      </div>
    </nav>
  </header>
);