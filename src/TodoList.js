import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos, showUser }) => (
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

          <button type="button" onClick={() => showUser(todo.userId)}>
            User
            {todo.userId}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default TodoList;

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  showUser: PropTypes.func.isRequired,
};
