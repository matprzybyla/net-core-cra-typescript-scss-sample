import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import configureStore from './store';
import Main from './pages/Main';
import MessagePanel from './components/MessagePanel/MessagePanel';

import './scss/index.scss'

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
const history = createBrowserHistory({ basename: baseUrl });
const store = configureStore(history);
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Main>
                <Switch>
                    <Route exact path="/" component={MessagePanel} />
                    <Route exact path="/somewhere" render={() => (<div>Went somewhere</div>)} />
                    <Route render={() => (<div>404: no such route</div>)} />
                </Switch>
            </Main>
        </ConnectedRouter>
    </Provider>,
    rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
