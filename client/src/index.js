
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {Route, Router, Switch} from "react-router-dom";

import {createBrowserHistory} from "history";

// ReactDOM.render(<App />, document.getElementById('root'));
const hist = createBrowserHistory();
ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route exact path="/" component={App}/>
        </Switch>
    </Router>,
    document.getElementById('root')
);