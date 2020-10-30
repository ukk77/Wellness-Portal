import React, { useContext, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link, Switch  } from "react-router-dom";
import './Nav.css'
import AuthService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'

function Nav(props) {
    const { user,setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    const onCLickLogoutHandler = () => {
        AuthService.logout()
        .then(data => {
            if(data.success){
                setUser(data.user)
                setIsAuthenticated(false)
            }
        })
    }

    const unAuthenticatedNav = () => {
        return (
            <Fragment>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/SearchForDoctors">Search Doctors</Link></li>
                <li><Link to="/About">About</Link></li>
                    <span className="rightvalues">	
                        <li><Link to="/Login">Login</Link></li>
                        <li><Link to="/Register">Register</Link></li>
                    </span>
		    </ul>
            </Fragment>
        )
    }

    const authenticatedNav = () => {
        if (user.role == 'Doctor'){
            return (
                <Fragment>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/SearchForDoctors">Search Doctors</Link></li>
                <li><Link to="/Appointments">Appointments</Link></li>
                <li><Link to="/About">About</Link></li>
                    <span className="rightvalues">	
                        <li><Link to="/Profile">Profile</Link></li>
                        <li><Link to="/" onClick={onCLickLogoutHandler}>Logout</Link></li>
                    </span>
                </ul>
            </Fragment>
            )
        }
        else{
            return (
                <Fragment>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/ScheduleAppointment">Schedule an appointment</Link></li>
                    <li><Link to="/SearchForDoctors">Search Doctors</Link></li>
                    <li><Link to="/About">About</Link></li>
                        <span className="rightvalues">	
                            <li><Link to="/Profile">Profile</Link></li>
                            <li><Link to="/" onClick={onCLickLogoutHandler}>Logout</Link></li>
                        </span>
                    </ul>
                </Fragment>
            )
        }
    }

    return (
        <div>
        <div className="containerx">
		<div className="left">
            {isAuthenticated?  authenticatedNav() : unAuthenticatedNav() }
		</div>
		</div>
		
        </div>
    )
}

export default Nav
