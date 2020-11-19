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
import Profile_Doctors from './Components/Profile_Doctors'

//App.js is the topmost component after index.documentation-sidebar
/*App.js uses React Router concept that uses the Router, Switch, Route and Link tags to let the users 
navigate from one page to another*/
//Below the Route is a path to the given path/ page and the following component is what will be displayed at that page.

function App() {
  const { user,setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
  return (
    <div>
      <Router>
        <Nav/>
        <Switch>
          <Route path="/" exact component={Homepage}/>
          <Route path="/Login" exact component={Login}/>
          <Route path="/Register" exact component={Register}/>
          <Route path="/About" exact component={About}/> 
          <Route path="/SearchForDoctors" exact component={SearchForDoctors}/>
          <Route path="/Profile" exact component={Profile}/> 
          <Route path="/Profile_Doctors" exact component={Profile_Doctors}/> 
          <Route path="/ScheduleAppointment" exact component={ScheduleAppointment}/> 
          <Route path="/Appointments" exact component={Appointments}/> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
