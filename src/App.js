import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Posts from './components/posts';
import Post from './components/post';
import { Navbar, NavbarBrand } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar className='border-bottom mb-5' color="faded" light expand="md">
            <div className='container'>
              <NavbarBrand href="/">Blog</NavbarBrand>
            </div>
          </Navbar>
            <div className='container'>
              <Switch>
                <Route exact path="/" component={Posts} />
                <Route exact path="/posts/:id" component={Post} />
              </Switch>
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
