import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { Router, browserHistory } from 'react-router';
import { routerReducer, syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import routes from './routes';
import { sagas, initApp } from './behavior/app/AppActions';
import { reducers as appReducers } from './behavior/app/reducers';

import './index.css';

const reducers = combineReducers({
  ...appReducers,
  routing: routerReducer,
});

const sagaMiddleware = createSagaMiddleware();
const routingMiddleware = routerMiddleware(browserHistory);

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      sagaMiddleware,
      routingMiddleware,
    ),
  ),
);

sagaMiddleware.run(sagas);
store.dispatch(initApp({ store }));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root'),
);
