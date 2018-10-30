import React from 'react';

export default ({ show }) => show ? <div className='loading-overlay'>Cargando..</div> : null;