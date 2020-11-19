import React, { useContext, Fragment } from 'react'
import { BrowserRouter as Router, Route, Link, Switch  } from "react-router-dom";
import './Nav.css'
import AuthService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'

//Nav bar component 
function Nav(props) {
    const { user,setUser, isAuthenticated, setIsAuthenticated, patientData, setPatientData } = useContext(AuthContext)

//function to handle logout when logout button is clicked.
//Logout is handled using the AuthService logout method and by clearing the states in the AuthContext i.e the frontend
    const onCLickLogoutHandler = () => {
        AuthService.logout()
        .then(data => {
            if(data.success){
                setUser(data.user)
                setIsAuthenticated(false)
                setPatientData( patientData => [])
            }
        })
    }

//Nav bar if a user is not logged-in/ not authenticated
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

//nav bar if a user is authenticated
    const authenticatedNav = () => {
        //Nav bar if the authenticated user is a Doctor
        if (user.role == 'Doctor'){
            return (
                <Fragment>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/SearchForDoctors">Search Doctors</Link></li>
                <li><Link to="/Appointments">Appointments</Link></li>
                <li><Link to="/About">About</Link></li>
                    <span className="rightvalues">	
                        <li><Link to="/Profile_Doctors">Profile</Link></li>
                        <li><Link to="/" onClick={onCLickLogoutHandler}>Logout</Link></li>
                    </span>
                </ul>
            </Fragment>
            )
        }
        else{
            //Nav bar if the authenticated user is a patient
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
