import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import configureStore from './store';
import { ReactNode } from 'react';
import * as MainApp from './routes';

import './scss/index.scss'


// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
const history = createBrowserHistory({ basename: baseUrl });
const store = configureStore(history);
const rootElement = document.getElementById('root');

const renderApp = (appToRender: ReactNode) => ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history} children={appToRender} />
    </Provider>,
    rootElement
);
renderApp(MainApp.Routes);

// Allow Hot Module Replacement
if (module.hot) {
    module.hot.accept('./routes', () => {
        const app = require<typeof MainApp>('./routes').Routes;
        renderApp(app);
    });
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
