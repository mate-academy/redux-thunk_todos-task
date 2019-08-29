import React from 'react';
import PropTypes from 'prop-types';

const CurrentUser = ({ user }) => (
  <div className="CurrentUser">
    <strong>Selected user:</strong>
    <ul>
      <li>{`#${user.id}`}</li>
      <li>{user.name}</li>
      <li>{user.email}</li>
      <li>{user.phone}</li>
    </ul>
  </div>
);

export default CurrentUser;

CurrentUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};
