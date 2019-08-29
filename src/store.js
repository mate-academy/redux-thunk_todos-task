import { createStore } from 'redux';

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(
  reducer,
  initialState
);

export default store;
