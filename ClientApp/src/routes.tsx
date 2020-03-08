
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './pages/Main';
import MessagePanel from './components/MessagePanel/MessagePanel';
import { SecuredPanel } from './components/SecuredPanel/SecuredPanel';

export const Routes = <Main>
    <Switch>
        <Route exact path="/" component={MessagePanel} />
        <Route exact path="/testsecured" component={SecuredPanel} />
        <Route exact path="/somewhere" render={() => (<div>Went somewhere</div>)} />
        <Route render={() => (<div>404: no such route</div>)} />
    </Switch>
</Main>;