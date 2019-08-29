import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  loadTodos,
  clearUser,
  showUser,
  getCurrentUser,
  getUserIsLoading,
  getUserHasError,
  getSelectedUserId,
} from './store';

import CurrentUser from './CurrentUser';

class UserTable extends React.Component {
  getUser = (userId) => {
    this.props.loadUser(userId);
  }

  render() {
    const {
      currentUser,
      userId,
      clear,
      userIsLoading,
      hasError,
    } = this.props;

    if (userIsLoading) {
      return (
        <section>
          <p className="info">Loading...</p>

          <div className="content">
            <div className="loader" />
          </div>
        </section>
      );
    }

    if (hasError) {
      return (
        <section>
          <p className="info">
            Failed loading user
            <button
              type="button"
              onClick={() => this.getUser(userId)}
            >
              Reload
            </button>
          </p>
          <div className="content">
            <p>-</p>
          </div>
        </section>
      );
    }

    if (Object.keys(currentUser).length === 0) {
      return (
        <section>
          <p className="info">User is not selected</p>

          <div className="content">
            <p>-</p>
          </div>
        </section>
      );
    }

    return (
      <section>
        <p className="info">
          {`User #${currentUser.id} is loaded`}
          <button
            type="button"
            onClick={clear}
          >
            Clear
          </button>
        </p>

        <div className="content">
          <CurrentUser user={currentUser} />
        </div>
      </section>
    );
  }
}

const getData = state => ({
  currentUser: getCurrentUser(state),
  userId: getSelectedUserId(state),
  userIsLoading: getUserIsLoading(state),
  hasError: getUserHasError(state),
});

const getMethods = dispatch => ({
  loadTodos: () => dispatch(loadTodos()),
  clear: () => dispatch(clearUser()),
  loadUser: userId => dispatch(showUser(userId)),
});

export default connect(getData, getMethods)(UserTable);

UserTable.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.number.isRequired,
  loadUser: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  userIsLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
};
