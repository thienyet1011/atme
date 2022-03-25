import thunk from "redux-thunk";

import { useMemo } from "react";
import { createStore, applyMiddleware, compose, Store } from "redux";

import rootReducer from "./reducers";

export type RootState = ReturnType<typeof rootReducer>;

const middleware = [thunk];
let store: Store;

const initStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware))
  );
};

export const getStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });

    // Reset current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;

  // Create the store once in the client
  if (!store) store = _store;
  return _store;
};

export const useStore = (initialState) => {
    const store = useMemo(() => getStore(initialState), [initialState]);
    return store;
}