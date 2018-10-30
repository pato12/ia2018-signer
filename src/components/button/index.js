import React from 'react';

import './button.css';

export default ({ children, ...props }) => (
  <button {...props}>{children}</button>
);