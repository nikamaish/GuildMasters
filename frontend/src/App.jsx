import React, { useState, useEffect } from 'react';
import Navbar from './navbar/navbar.jsx';
import Intro from './intro/intro.jsx';
import Mid from './mid/mid.jsx';
import Events from './events/Events.jsx';
import Subscription from './subscription/Subscription.jsx';
import Footer from './footer/Footer.jsx';
import Games from './Games/Games.jsx';
import Loader from './loader/Loader.jsx'; // Make sure to import the Loader component
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Userprofile from './userProfile/Userprofile.jsx';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Intro} />
          {/* <Route path="/userProfile" component={Userprofile} /> */}
        </Switch>
        <Mid />
        <Events />
        <Games />
        <Subscription />
        <Footer />
        <Userprofile />
      </div>
    </Router>
  );
};

export default App;
