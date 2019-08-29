import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  loadTodos,
  clearTodos,
  getTodosFromState,
  getTodosAreLoading,
  getTodosHaveError,
} from './store';

import TodoList from './TodoList';

class TodosTable extends React.Component {
  getTodos = () => {
    this.props.loadTodos();
  }

  render() {
    const {
      todos,
      clear,
      todosAreLoading,
      hasError,
    } = this.props;

    if (todosAreLoading) {
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
            Failed loading todos
            <button
              type="button"
              onClick={this.getTodos}
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

    if (todos.length < 1) {
      return (
        <section>
          <p className="info">
            Todos are not loaded yet
            <button
              type="button"
              onClick={this.getTodos}
            >
              Load
            </button>
          </p>

          <div className="content">
            <p>-</p>
          </div>
        </section>
      );
    }

    return (
      <section>
        {todos.length > 1
          ? (
            <p className="info">
              6 todos are loaded
              <button
                type="button"
                onClick={clear}
              >
                Clear
              </button>
            </p>
          ) : (
            <p className="info">
              1 todo is loaded
              <button
                type="button"
                onClick={clear}
              >
                Clear
              </button>
            </p>
          )
        }

        <div className="content">
          <TodoList todos={todos} />
        </div>
      </section>
    );
  }
}

const getData = state => ({
  todos: getTodosFromState(state),
  todosAreLoading: getTodosAreLoading(state),
  hasError: getTodosHaveError(state),
});

const getMethods = dispatch => ({
  loadTodos: () => dispatch(loadTodos()),
  clear: () => dispatch(clearTodos()),
});

export default connect(getData, getMethods)(TodosTable);

TodosTable.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadTodos: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  todosAreLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
};
