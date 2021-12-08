import './App.css';
import React from 'react';
import Admin from './pages/admin'
import HR from './pages/admin/hr';
import News from './pages/client/news';
import Store from './pages/client/store';
import About from './pages/client/about';
import Manager from './pages/admin/manager';
import Order from './pages/admin/order';
import Director from './pages/admin/director';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


function App() {

  return (
    
    <Router>

        <Route exact path="/"><Redirect to="/store" /></Route>
        <Route path="/store" component = { Store }/>
        <Route path="/admin" component= { Admin }/>
        <Route path="/news" component= { News }/>
        <Route path="/about" component= { About }/>
        <Route path="/manager" component= { Manager }/>
        <Route path="/order" component= { Order }/>
        <Route path="/director" component = {Director}/>
        <Route path="/hr" component = {HR}/>

    </Router>

    );
  }
    
  export default App;