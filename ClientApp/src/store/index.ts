import * as Test from './test';
import * as SecuredTest from './testSecured';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'history'
import { createStore, compose, applyMiddleware, combineReducers, Store, Reducer, Middleware } from 'redux';
import thunk from 'redux-thunk';
import { connectRouter } from 'connected-react-router';

// The top-level state object
export interface ApplicationState {
    test: Test.State,
    secured: SecuredTest.State
}

const reducers = {
    test: Test.reducer,
    secured: SecuredTest.reducer
};

declare const process: {
    env: {
        NODE_ENV: string
    }
}

export default function configureStore(history: History) {
    const enhancers = [];
    const isDevelopment = process.env.NODE_ENV === 'development';
    if (isDevelopment && typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION__) {
        // use the browser's Redux dev tools extension if installed
        enhancers.push((window as any).__REDUX_DEVTOOLS_EXTENSION__());
    }

    type MainReducerType = (reducer: Reducer<ApplicationState>, initialState?: ApplicationState) => Store<ApplicationState>;
    const middlewares = [thunk, routerMiddleware(history)] as Array<Middleware>;
    const createStoreWithMiddleware = compose<MainReducerType>(applyMiddleware(...middlewares), ...enhancers)(createStore);
    const allReducers = combineReducers<ApplicationState>(Object.assign({}, reducers, { router: connectRouter(history) }));
    const store = createStoreWithMiddleware(allReducers) as Store<ApplicationState>;

    return store;
}