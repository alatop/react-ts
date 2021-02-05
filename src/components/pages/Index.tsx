import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from './App/App';
import GoodsList  from './Goods/GoodsList';

export default function BasicExample() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/goods">Товары</Link>
            </li>
          </ul>
          <hr />
          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
           <Route path="/goods">
              <GoodsList />
            </Route>

          </Switch>
        </div>
      </Router>
    );
  }