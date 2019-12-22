import React, { Component } from 'react';
import Seats from './components/seats';
import SearchForm from './components/form';
// import { BrowserRouter, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <BrowserRouter>
          <Switch>
            <Route exact path='/' component={SearchForm} />
            <Route path='/seat' component={Seats} />
          </Switch>
        </BrowserRouter> */}
        <SearchForm />
      </div>
    );
  }
}

export default App;
