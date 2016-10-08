import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import AppContainer from './AppContainer';
import DashboardContainer from './dashboard/DashboardContainer';
import ProjectsContainer from './projects/ProjectsContainer';
import reducers from './reducers'
import './index.css';

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <IndexRoute component={DashboardContainer}/>
        <Route path="/projects" component={ProjectsContainer}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
