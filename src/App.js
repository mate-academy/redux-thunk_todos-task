/* eslint-disable no-nested-ternary */
import React from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import { useDispatch, useSelector } from 'react-redux';

import CurrentUser from './CurrentUser';
import TodoList from './TodoList';
import { clearTodos as clearStateTodos,
  clearUser as clearStateUser,
  loadTodos, loadUser } from './store';

const override = css`
  display: block;
  margin: 0 auto;
  border: 3px solid grey;
`;

const App = () => {
  const dispatch = useDispatch();
  const { todos,
    currentUser,
    isLoading,
    isLoaded,
    hasError,
    isLoadingUser } = useSelector(state => state);

  const getTodos = () => {
    dispatch(loadTodos());
  };

  const clearTodos = () => {
    dispatch(clearStateTodos());
  };

  const showUser = (id) => {
    dispatch(loadUser(id));
  };

  const clearUser = () => {
    dispatch(clearStateUser());
  };

  return (
    <main className="App">
      <section>
        {isLoading ? (<p className="info">Loading...</p>
        ) : (
          isLoaded ? (
            hasError ? (
              <p className="info">
              Failed loading todos
                <button type="button" onClick={getTodos}>Reload</button>
              </p>
            ) : (
              <p className="info">
                {todos.length}
                {' '}
                todos are loaded
                <button type="button" onClick={clearTodos}>Clear</button>
              </p>
            )

          ) : (
            <p className="info">
            Todos are not loaded yet
              <button type="button" onClick={getTodos}>Load</button>
            </p>
          )
        )}

        {!Object.entries(currentUser).length ? (
          <p className="info">User is not selected</p>
        ) : (
          <p className="info">
          User #
            {currentUser.id}
            is loaded
            <button type="button" onClick={clearUser}>Clear</button>
          </p>
        )}
      </section>

      {/* <section>

        <p className="info">
          Failed loading user
          <button type="button">Reload</button>
        </p>
      </section>

      <section>
        <p className="info">
          User #1 is loaded
          <button type="button">Clear</button>
        </p>
      </section>

      <section>
        <p className="info">User #999 does not exist</p>
      </section> */}

      <section>
        <div className="content">
          {isLoading ? (
            <ClipLoader
              css={override}
              size={50}
              color="black"
              loading={isLoading}
            />
          ) : (
            isLoaded && !hasError ? (
              <TodoList todos={todos} showUser={showUser} />
            ) : (
              <></>
            ))}
        </div>
        <div className="content content--user">
          {Object.entries(currentUser).length ? (
            <CurrentUser user={currentUser} />
          ) : (
            <ClipLoader
              css={override}
              size={50}
              color="black"
              loading={isLoadingUser}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default App;
