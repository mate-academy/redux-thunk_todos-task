import { createStore, applyMiddleware } from 'redux';
import thunk  from 'redux-thunk';


import { getTodos, getUser } from './api';

const START_LOADING = 'startLoading';
const SET_TODOS = 'setTodos';
const SET_USER = 'setUser';
const HANDLE_ERROR = 'handleError';
const CLEAR_TODOS = 'clearTodos';

export const startLoading = () => ({ type: START_LOADING });
export const handleError = () => ({ type: HANDLE_ERROR });

export const setTodos = todos => ({ type: SET_TODOS, todos });
export const setUser = user => ({ type: SET_USER, user });
export const clearTodos = () => ({type: CLEAR_TODOS });

export const loadTodos = () => {
  return (dispatch) => {
    dispatch(startLoading());

    return getTodos()
      .then(todos => dispatch(setTodos(todos)))
      .catch(() => dispatch(handleError()));
  };
}

export const getTodosFromState = state => state.todos;
export const getCurrentUser = state => state.currentUser;
export const getIsLoading = state => state.isLoading;
export const getHasError = state => state.hasError;

const initialState = {
  todos: [],
  currentUser: {},
  isLoading: false,
  hasError: false,
};

const reducer = (state, action) => {

  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
        isLoading: false
      }

    case SET_USER:
        return {
          ...state,
          currentUser: action.user,
          isLoading: false
        }

    case HANDLE_ERROR:
        return {
          ...state,
          hasError: true,
          isLoading: false
        }

    case CLEAR_TODOS:
      return {
        ...state,
        todos: [],
      }

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
