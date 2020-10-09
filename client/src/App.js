import React,{useState, useEffect} from 'react';
import {Redirect, Route, BrowserRouter} from 'react-router-dom';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField'
import UserProfile from './UserProfile'


function App() {
  
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [login, setLogin] = useState(false)
const [name, setName] = useState("")
const [msg, setMsg] = useState("Hello")

const send_request = async () => {
  let url = "http://localhost:5000/api/auth/"
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email:email, password:password })
  };
  fetch(url, requestOptions)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    if(data.hasOwnProperty('user')){
      setName(data.user.username)
    }
    else{
      setMsg(data.msg)
    }
  })
  .then(setLogin(true))
  
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const onPassChange = (e) => {
    setPassword(e.target.value)
  }
  
  return (
    <BrowserRouter>
    <div className="App">
    
    {login? 
      <h1>{msg + " " + name}</h1> : 
      <div className="login_boxes">
        <Card className="login_card">
          <CardContent>
            <div className="login_form" autoComplete="off">
              <TextField required id="filled-required" variant="outlined" placeholder="Email" onChange={onEmailChange} />
              <TextField required id="filled-required" variant="outlined" placeholder="Password" onChange={onPassChange}/>
              <Button variant="contained" onClick={send_request}>Log-in</Button><br/>
            </div>
          </CardContent>
        </Card>
      </div>
    }
      
    </div>
    </BrowserRouter>
  );
}

export default App;
