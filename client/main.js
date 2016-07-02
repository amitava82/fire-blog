/**
 * Created by amitava on 01/07/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import useScroll from 'react-router-scroll';
import { Provider } from 'react-redux';
import routes from './routes';
import createStore from './redux/createStore';

const store = createStore();
const _routes = routes(store);
const history = syncHistoryWithStore(browserHistory, store);

class Client extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router  history={history} render={applyRouterMiddleware(useScroll())}>
          {_routes}
        </Router>
      </Provider>
    )
  }
}

ReactDOM.render(<Client />, document.getElementById('app'));