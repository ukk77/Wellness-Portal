import React,{useState, useEffect, useContext} from 'react';
import {  
    TextField,
    Button        
} from "@material-ui/core"
import './Login.css';
import AuthService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'
import Message from './Message'

//bring getInfo function and gather data here for patients

function Login(props) {

    const [user, setUser] = useState({ username : "", password : "" }) 
    const [msg, setMsg] = useState(null)
    const authContext = useContext(AuthContext)

    const onUsernameChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name] : e.target.value})
    }
    
    const onPassChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name] : e.target.value})
    }


    const onSubmit = (e) => {
        AuthService.login(user)
        .then(data => {
            const { isAuthenticated, user, message } = data
            if (isAuthenticated) {
                authContext.setUser(user)
                authContext.setIsAuthenticated(true)
                props.history.push('/')
            }
            else {
                setMsg(message)
            } 
        })
    }


    return (
        <div>
            <div className="outer" id="outer">
                <div className="wrapper">
                    <div className="login_form_wrapper">
                        <form noValidate autoComplete="off" className="login_form">
                            <TextField id="outlined-bashic" placeholder="Username" name="username" className="username_box" variant="outlined" onChange={onUsernameChange}/>
                            <TextField id="outlined-basic" placeholder="Password" name ="password" type="password" className="password_box" variant="outlined" onChange={onPassChange}/>
                            <Button variant="contained" size="medium" value="Log-in" className="login_button" onClick={onSubmit}>Log-in</Button>
                        </form>
                        { msg? <Message  message={msg}/> : null }
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Login
