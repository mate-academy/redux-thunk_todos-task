import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { showUser } from './store';

const TodoList = ({ todos, loadUser }) => (
  <div className="TodoList">
    <strong>Todos:</strong>

    <ul className="TodoList__list">
      {todos.map(todo => (
        <li key={todo.id} className="TodoList__item">
          <label htmlFor={`todo-${todo.id}`}>
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.completed}
              readOnly
            />
            {todo.title}
          </label>

          <button type="button" onClick={() => loadUser(todo.userId)}>
            User
            {todo.userId}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

const getMethods = dispatch => ({
  loadUser: userId => dispatch(showUser(userId)),
});

export default connect(null, getMethods)(TodoList);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadUser: PropTypes.func.isRequired,
};
