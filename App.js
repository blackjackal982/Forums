import React, { Component } from 'react';
import NavBar from "./components/navbar";
import Comps from './components/comp';

class App extends Component {

  state={
buttons:null
  }
    render() {
    return (
      <React.Fragment>
      <main className="container">
      <NavBar />
      <Comps />
      </main>
    </React.Fragment>
    );
  }
}

export default App;
