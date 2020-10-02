import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './header/header.jsx';
import Home from './home/home';
import Footer from './footer/footer'
import Detail from './detail/detail.jsx';
import Blog from './AddBlog/newBlog';

class App extends Component {
  render() {
    return (
      <Router>
          <NavBar />
          <Route exact path='/' component={Home} />
          <Route path='/detail' component={Detail} />
          <Route path='/add' component={Blog} />
          <Footer />
      </Router>
    );
  }
}

export default App;
