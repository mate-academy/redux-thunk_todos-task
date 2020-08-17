import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import { getTodos, getUser } from './api';

const START_TODOS_LOADING = 'START_TODOS_LOADING';
const FINISH_TODOS_LOADING = 'FINISH_TODOS_LOADING';
const HANDLE_ERROR = 'HANDLE_ERROR';
const CLEAR_TODOS = 'CLEAR_TODOS';
const START_LOADING_USER = 'START_LOADING_USER';
const FINISH_LOADING_USER = 'FINISH_LOADING_USER';
const CLEAR_USER = 'CLEAR_USER';

export const startLoading = () => ({ type: START_TODOS_LOADING });
export const finishLoading = todos => ({
  type: FINISH_TODOS_LOADING,
  todos,
});
export const handleError = () => ({ type: HANDLE_ERROR });
export const clearTodos = () => ({ type: CLEAR_TODOS });
export const startLoadingUser = () => ({ type: START_LOADING_USER });
export const finishtLoadingUser = user => ({
  type: FINISH_LOADING_USER, currentUser: user,
});
export const clearUser = () => ({ type: CLEAR_USER });

export const loadTodos = () => (dispatch) => {
  dispatch(startLoading());
  getTodos()
    .then(data => dispatch(finishLoading(data)))
    .catch(() => dispatch(handleError()));
};

export const loadUser = id => (dispatch) => {
  const { currentUser } = store.getState();

  if (id !== currentUser.id) {
    dispatch(clearUser());
    dispatch(startLoadingUser());
    getUser(id).then(user => dispatch(finishtLoadingUser(user)));
  }
};

const initialState = {
  isLoading: false,
  isLoaded: false,
  hasError: false,
  isLoadingUser: false,
  currentUser: {},
  todos: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_TODOS_LOADING:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };

    case HANDLE_ERROR:
      return {
        ...state,
        hasError: true,
        isLoading: false,
        isLoaded: true,
      };

    case FINISH_TODOS_LOADING:
      return {
        ...state,
        todos: action.todos,
        isLoading: false,
        hasError: false,
        isLoaded: true,
      };

    case CLEAR_TODOS:
      return {
        ...state,
        isLoaded: false,
        todos: [],
      };

    case START_LOADING_USER:
      return {
        ...state,
        isLoadingUser: true,
      };

    case FINISH_LOADING_USER:
      return {
        ...state,
        currentUser: action.currentUser,
        isLoadingUser: false,
      };

    case CLEAR_USER:
      return {
        ...state,
        currentUser: {},
        isLoadingUser: false,
      };

    default:
      return state;
  }
};

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  ),

);

export default store;
