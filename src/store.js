import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { getTodos, getUser } from './api';

const START_TODOS_LOADING = 'startTodosLoading';
const SET_TODOS = 'setTodos';
const HANDLE_TODOS_ERROR = 'handleTodosError';
const CLEAR_TODOS = 'clearTodos';

const START_USER_LOADING = 'startUserLoading';
const SET_USER = 'setUser';
const SELECT_USER = 'selectUser';
const HANDLE_USER_ERROR = 'handleUserError';
const CLEAR_USER = 'clearUser';

export const startTodosLoading = () => ({ type: START_TODOS_LOADING });
export const handleTodosError = () => ({ type: HANDLE_TODOS_ERROR });
export const setTodos = todos => ({ type: SET_TODOS, todos });
export const clearTodos = () => ({ type: CLEAR_TODOS });

export const startUserLoading = () => ({ type: START_USER_LOADING });
export const handleUserError = () => ({ type: HANDLE_USER_ERROR });
export const setUser = user => ({ type: SET_USER, user });
export const selectUser = userId => ({ type: SELECT_USER, userId });
export const clearUser = () => ({ type: CLEAR_USER });

export const loadTodos = () => (dispatch) => {
  dispatch(startTodosLoading());

  return getTodos()
    .then(todos => dispatch(setTodos(todos)))
    .catch(() => dispatch(handleTodosError()));
};

export const showUser = userId => (dispatch) => {
  dispatch(startUserLoading());
  dispatch(selectUser(userId));

  return getUser(userId)
    .then(user => dispatch(setUser(user)))
    .catch(() => dispatch(handleUserError()));
};

export const getTodosFromState = state => state.todos;
export const getTodosAreLoading = state => state.todosAreLoading;
export const getTodosHaveError = state => state.todosHaveError;

export const getCurrentUser = state => state.currentUser;
export const getSelectedUserId = state => state.selectedUserId;
export const getUserIsLoading = state => state.userIsLoading;
export const getUserHasError = state => state.userHasError;

const initialState = {
  todos: [],
  todosAreLoading: false,
  todosHaveError: false,

  currentUser: {},
  selectedUserId: null,
  userIsLoading: false,
  userHasError: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_TODOS_LOADING:
      return {
        ...state,
        todosAreLoading: true,
        todosHaveError: false,
      };

    case START_USER_LOADING:
      return {
        ...state,
        userIsLoading: true,
        userHasError: false,
      };

    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
        todosAreLoading: false,
      };

    case SET_USER:
      return {
        ...state,
        currentUser: action.user,
        userIsLoading: false,
      };

    case SELECT_USER:
      return {
        ...state,
        selectedUserId: action.userId,
      };

    case HANDLE_TODOS_ERROR:
      return {
        ...state,
        todosHaveError: true,
        todosAreLoading: false,
      };

    case HANDLE_USER_ERROR:
      return {
        ...state,
        userHasError: true,
        userIsLoading: false,
      };

    case CLEAR_TODOS:
      return {
        ...state,
        todos: [],
      };

    case CLEAR_USER:
      return {
        ...state,
        currentUser: {},
      };

    default:
      return state;
  }
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk),
);

export default store;
