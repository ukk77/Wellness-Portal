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

// Register function contains everything that the register page requires and the register component uses.
function Register(props) {

    const [user, setUser] = useState({ username : "", password : "", firstName : "", lastName : "" }) 
    const [msg, setMsg] = useState(null)
    let timeId = useRef(null)

    //This useEffect function runs when the register page is clicked on i.e when the register component mounts
    //This function basically clears the jwt token time of expiration
    useEffect(() => {
        return () => {
            clearTimeout(timeId)
        }
    }, []);

    //This function takes input a string(password here) and validates the string for the criteria mentioned.
    const validate = (str) => {
        //Check if string has at least 8 characters
        if (str.length < 8){
            setMsg({msgBody:"Please enter a password with at least than 8 characters"})
            return false
        }

        /*Check if string has at least 1 upper case and 1 lower case letters and also at least 1 digit 
        and 1 special symbol*/
        var passTestRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])");
        if (passTestRegex.test(str)){
            return true
        }
        else{
            setMsg({msgBody: "Please enter a valid password with at least 8 characters, and containing 1 uppercase, 1 lowercase, 1 digit and 1 special symbol"})
            return false
        }
    }
    
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

    //Handles changes in first name in the first name field and updates user object with it
    const onFirstNameChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name] : e.target.value})
    }

    //Handles changes in last name in the last name field and updates user object with it
    const onLastNameChange = (e) => {
        e.preventDefault();
        setUser({...user, [e.target.name] : e.target.value})
    }

    //This function resets the form so that no data is shared between users i.e persists between users.
    const resetForm = () => {
        setUser({ username : "", password : "", firstName: "", lastName: "" })
    }

    /*This function works when the register button is clicked.
    First it checks if the user has entered a username, a password, a firstname and a lastname.If not an error is 
    displayed.Then the password is validated for different criteria using the validate function.
    Further it uses the authservice register method to reguster the user and takes the user to the 
    login page where he/she can login */
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
        <StylesProvider>
        <div>
            <div className="outer" id="outer">
                <div className="register_wrapper">
                    <div className="register_form_wrapper">
                        <form noValidate autoComplete="off" className="register_form">
                        <div className="inputs--register" >
                        <div className="username_field">
                            <TextField id="Filled-basic" placeholder="Username" name="username" className="username_box" variant="filled" onChange={onUsernameChange}/>
                        </div><br/>
                            <TextField id="filled-basic" placeholder="Firstname" name="firstName" className="firstName_box" variant="filled" onChange={onFirstNameChange}/><br/><br/>
                            <TextField id="filled-basic" placeholder="Lastname" name="lastName" className="lastname_box" variant="filled" onChange={onLastNameChange}/><br/><br/>
                        
                        <div className="password_field">
                            <TextField id="filled-basic" placeholder="Password" name ="password" type="password" className="password_box" variant="filled" onChange={onPassChange}/>
                        </div>
                        </div>
                            <Button variant="contained"  size="medium" value="Log-in" className="register_button" onClick={onSubmit}>Register</Button>
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
