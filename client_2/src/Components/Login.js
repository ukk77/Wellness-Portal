import React,{useState, useEffect, useContext} from 'react';
import {  
    TextField,
    Button        
} from "@material-ui/core"
import './Login.css';
import AuthService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'
import Message from './Message'

// Login function contains everything that the login page requires and the login component uses.
function Login(props) {

    const [user, setUser] = useState({ username : "", password : "" }) 
    const [msg, setMsg] = useState(null)
    const authContext = useContext(AuthContext)

    //Handles changes in username in the username field and updates user object with it
    const onUsernameChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name] : e.target.value})
    }
    
    //Handles changes in password in the password field and updates user object with it
    const onPassChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name] : e.target.value})
    }

    //getInfo function is used when a doctor logs in.
    /*This function gets data for all those patients that the authenticated doctor has access to i.e the patients that 
    have an appointment with this doctor*/
    const getInfo = async (name) => {
        await AuthService.getUserInfo(name)
       .then( data => {
        authContext.setPatientData(patientData => [...patientData, data ])
       })
    }

    //onSubmit is the function that works when the user hits the log-in button
    //This function first checks for mising or empty username or password and then goes forward for their validation.
    //This function uses the login method in the AuthService file.
    const onSubmit = (e) => {
        if(user.username === ""){
            setMsg({msgBody:"Please enter a unique username"})
        }
        else if(user.password === "" ){
            setMsg({msgBody: "Please enter a password"})
        }
        AuthService.login(user)
        .then(data => {
            const { isAuthenticated, user, message } = data
            if (isAuthenticated) {
                authContext.setUser(user)
                authContext.setIsAuthenticated(true)
                if(user.role === "Doctor"){
                    user.access_to.map(
                        res => {
                            getInfo({ username : res })
                        }
                    )
                }
                props.history.push('/')
            }
            else {
                setMsg({msgBody: "Username or password not valid"})
            } 
        })
    }


    return (
        <div>
            <div className="outer" id="outer">
                <div className="wrapper">
                    <div className="login_form_wrapper">
                        <form noValidate autoComplete="off" className="login_form">
                        <div className="inputs">   
                            <TextField id="outlined-bashic" placeholder="Username" name="username" className="username_box" style={{margin:"25px 0px"}} variant="outlined" onChange={onUsernameChange}/>
                            <TextField id="outlined-basic" placeholder="Password" name ="password" type="password" className="password_box" variant="outlined" onChange={onPassChange}/>
                            </div>
                           <div style={{marginTop:"30px", left: "35%",  position: "relative"}}>
                            <Button variant="contained" size="medium" value="Log-in" className="login_button" onClick={onSubmit}>Log-in</Button>
                           </div>
                        </form>
                        <br/><br/><br/>
                        { msg? <Message  message={msg}/> : null }
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Login
