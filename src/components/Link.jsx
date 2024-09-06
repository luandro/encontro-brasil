import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Link = ({ to, children, ...props }) => {
  const baseUrl = import.meta.env.BASE_URL;
  const adjustedTo = to.startsWith('/') ? `${baseUrl}${to.slice(1)}` : to;

  return (
    <RouterLink to={adjustedTo} {...props}>
      {children}
    </RouterLink>
  );
};

export default Link;
