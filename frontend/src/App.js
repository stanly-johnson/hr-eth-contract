import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Components/Home'
import AddNew from './Components/AddNew'

function App() {
  return (
    <BrowserRouter>
      <main className="container">
          <Switch>
            <Route path="/add" component={AddNew} />
            <Route path="/" component={Home} />
            <Redirect to="/404" />
          </Switch>
        </main>
    </BrowserRouter>
  );
}

export default App;
