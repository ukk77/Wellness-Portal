import React,{useState, useEffect, useRef} from 'react';
import {  
    TextField,
    Button,
    StylesProvider        
} from "@material-ui/core"
import './Login.css';
import AuthService from '../Services/AuthService'
import Message from './Message'
import './Register.css'

function Register(props) {

    const [user, setUser] = useState({ username : "", password : "", firstName : "", lastName : "" }) 
    const [msg, setMsg] = useState(null)
    let timeId = useRef(null)

    useEffect(() => {
        return () => {
            clearTimeout(timeId)
        }
    }, []);

    const validate = (str) => {
        if (str.length < 8){
            setMsg({msgBody:"Please enter a password with at least than 8 characters"})
            return false
        }
        var passTestRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
        if (passTestRegex.test(str)){
            return true
        }
        else{
            setMsg({msgBody: "Please enter a valid password with at least 8 characters, and containing 1 uppercase, 1 lowercase, 1 digit and 1 special symbol"})
            return false
        }
    }

    const onUsernameChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name] : e.target.value})
    }
    
    const onPassChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name] : e.target.value})
    }

    const onFirstNameChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name] : e.target.value})
    }

    const onLastNameChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name] : e.target.value})
    }


    const resetForm = () => {
        setUser({ username : "", password : "", firstName: "", lastName: "" })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(user.username === ""){
            setMsg({msgBody:"Please enter a unique username"})
        }
        else if(user.password === "" ){
            setMsg({msgBody: "Please enter a password"})
        }
        else if(user.firstName === ""){
            setMsg({msgBody: "Please enter a firstname"})
        }
        else if(user.lastName === ""){
            setMsg({msgBody:"Please enter a lastname"})
        }
        else{
            let flag = validate(user.password)
            if(flag){
                AuthService.register(user)
                .then(data => {
                    const { message } = data;
                    setMsg(message);
                    resetForm();
                    if(!message.msgError) {
                        timeId = setTimeout(() => {
                            props.history.push('/Login')
                        }, 2000)
                    }
                })
            }
            else {
                setMsg({msgBody: "Please enter a valid password with at least 8 characters, and containing 1 uppercase, 1 lowercase, 1 digit and 1 special symbol"})
            }
        }
    }


    return (
        <StylesProvider injectFirst>
        <div>
            <div className="outer" id="outer">
                <div className="wrapper">
                    <div className="login_form_wrapper">
                        <form noValidate autoComplete="off" className="login_form">
                        <div className="username_field">
                            <TextField id="Filled-basic" placeholder="Username" name="username" className="username_box" variant="filled" onChange={onUsernameChange}/>
                        </div>
                        <div className="names">
                            <TextField id="filled-basic" placeholder="Firstname" name="firstName" className="firstName_box" variant="filled" onChange={onFirstNameChange}/>
                            <TextField id="filled-basic" placeholder="Lastname" name="lastName" className="lastname_box" variant="filled" onChange={onLastNameChange}/>
                        </div>
                        <div className="password_field">
                            <TextField id="filled-basic" placeholder="Password" name ="password" type="password" className="password_box" variant="filled" onChange={onPassChange}/>
                        </div>
                            <Button variant="contained"  size="medium" value="Log-in" className="login_button" onClick={onSubmit}>Register</Button>
                        </form>
                        { msg?  <Message  message={msg}/> : null }
                    </div>
                </div>
            </div> 
        </div>
        </StylesProvider>
    )
}

export default Register
