import React from 'react';
import './services/firebase';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';

import { Home } from './components/Home/Home';
import { Dashboard } from './components/Dashboard/Dashboard';

export default function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Switch>
          <Route exact path = '/' component = { Home } />
          <Route path = '/dashboard/:userID' component = { Dashboard } />
        </Switch>
      </Router>
    </AuthContextProvider>
  );
}