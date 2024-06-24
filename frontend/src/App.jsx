import React from 'react';
import Navbar from './navbar/navbar.jsx';
import Intro from './intro/intro.jsx';
import Mid from './mid/mid.jsx';
import Events from './events/Events.jsx';
import Subscription from './subscription/Subscription.jsx';
import Footer from './footer/Footer.jsx';
import Games from './Games/Games.jsx';
import Loader from './loader/Loader.jsx';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Main from './MainPage/Main.jsx';
import Userprofile from './userProfile/Userprofile.jsx';
import Cart from './cart/Summary.jsx';
import Login from './userProfile/Login.jsx';
import Logout from './userProfile/Logout.jsx';
import { AuthProvider } from './AuthContext/AuthContext.js';




const App = () => {

  // export y


  return (
    
    <AuthProvider>
      <Router>

        
        <div>
          <Navbar />

          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/userProfile" component={Userprofile} />
            <Route path='/games' component={Games}></Route>
            <Route path="/login" component={Login} />
            {/* <Route path='/cart' component={Cart}/> */}
            <Route path='/logout' component={Logout}/>
          </Switch>
        </div>
        
      </Router>
      </AuthProvider>
  );
};

export default App;
