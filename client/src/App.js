import './App.css';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Navbar from './components/nav'
import HomePage from './screens/homePage';
import Booking from './screens/booking';
import Register from './screens/Register';
import Login from './screens/login';
import profile from './screens/profile';
import Admin from './screens/admin';
import LandingPage from './screens/landingPage';
import React from 'react';
function App() {
  return (
    <div className="App">
      <Navbar name="Go Booking"/>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact Component={LandingPage}/>
          <Route path='/home' exact Component={HomePage}/>
          <Route path='/booking/:roomid/:fromDate/:toDate/:days' exact Component={Booking}/>
          <Route path='/register' exact Component={Register}/>
          <Route path='/login' exact Component={Login}/>
          <Route path='/profile' exact Component={profile}/>
          <Route path='/admin' exact Component={Admin}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
