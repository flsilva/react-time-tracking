import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import Routes from './routes';
import initApp, { appMiddleware } from './behavior/app';
import sagas from './behavior/app/AppSideEffects';
import { reducers as appReducers } from './behavior/app/AppState';
import './index.css';

const reducers = combineReducers({
  ...appReducers,
  routing: routerReducer,
});

const sagaMiddleware = createSagaMiddleware();

const browserHistory = createHistory();
const routingMiddleware = routerMiddleware(browserHistory);

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(
    appMiddleware,
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware,
      routingMiddleware,
    ),
  ),
);

sagaMiddleware.run(sagas);
initApp(store, browserHistory);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
