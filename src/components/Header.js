import React from 'react';
/**
 * 4. TODO - update to use function component
 */

function Header({ onClick, title }) {
  return (
    <header onClick={onClick} style={onClick ? { cursor: 'pointer' } : {}}>
      <h1>{title}</h1>
    </header>
  );
}

export default Header;
