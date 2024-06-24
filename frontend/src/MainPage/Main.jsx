import React, { useState, useEffect } from 'react';
import Navbar from '../navbar/navbar.jsx';
import Intro from '../intro/intro.jsx';
import Mid from '../mid/mid.jsx';
import Events from '../events/Events.jsx';
import Subscription from '../subscription/Subscription.jsx';
import Footer from '../footer/Footer.jsx';
import Games from '../Games/Games.jsx';
import Userprofile from '../userProfile/Userprofile.jsx';
import Cart from '../cart/Cart.jsx';

const Main = () => {
  return (
      <div>
        <Intro />
        <Mid />
        <Events />
        {/* <Games /> */}
        {/* <Cart/> */}
        <Subscription />
        <Footer />
      </div>
  );
};

export default Main;
