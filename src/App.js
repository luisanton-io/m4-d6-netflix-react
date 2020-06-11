import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Layout from './components/Layout'
import Register from './components/Register'
import {BrowserRouter as Router, Route} from 'react-router-dom'

class App extends Component {
 
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar showSearchResult={this.showSearchResult} defaultView={this.defaultView} />
          <Route path="/" exact component={Layout} />
          <Route path="/register" exact component={Register} />
        </Router>
      </div>
    );
  }
}

export default App;
