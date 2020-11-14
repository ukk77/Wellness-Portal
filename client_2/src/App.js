import React, { useContext } from 'react';
import { AuthContext } from './Context/AuthContext'
import Nav from './Components/Nav'
import './App.css'
import { BrowserRouter as Router, Route, Link, Switch, useHistory  } from "react-router-dom";
import Homepage from './Components/Homepage'
import Login from './Components/Login'
import Register from './Components/Register'
import About from './Components/About'
import SearchForDoctors from './Components/SearchForDoctors'
import  Profile from './Components/Profile'
import ScheduleAppointment from './Components/ScheduleAppointment'
import Appointments from './Components/Appointments'

function App() {
  const { user,setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Switch>
          <Route path="/" exact component={Homepage}/>
          <Route path="/Login" exact component={Login}/>
          <Route path="/Register" exact component={Register}/>
          <Route path="/About" exact component={About}/> 
          <Route path="/SearchForDoctors" exact component={SearchForDoctors}/>
          <Route path="/Profile" exact component={Profile}/> 
          <Route path="/ScheduleAppointment" exact component={ScheduleAppointment}/> 
          <Route path="/Appointments" exact component={Appointments}/> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
