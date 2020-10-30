import React, {useState, useContext} from 'react'
import AuthService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    makeStyles,
    TextField,
    CardActions,
    CardActionArea,
    List,
    ListItem
} from '@material-ui/core';
import './Profile.css'
import Message from './Message'


function Profile(props) {
    const { user,setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const [msg,setMsg] = useState("")
    const [changeGender, setChangeGender] = useState(false)
    const [changeAge, setChangeAge] = useState(false)
    const [changeBloodType, setChangeBloodType] = useState(false)
    
    const useStyles = makeStyles({
        root: {
          minWidth: 275,
          maxWidth: 375,
          margin: 1
        },
        bullet: {
          display: 'inline-block',
          margin: '0 2px',
          transform: 'scale(0.8)',
        },
        title: {
          fontSize: 14,
        },
        pos: {
          marginBottom: 12,
        },
        FormControl : {
            minWidth : 300,
            marginLeft : 10,
            marginTop : 10,
            marginRight : 10
        },
        demo: {
          },
    });
    
    if (!isAuthenticated){
        props.history.push('/Login')
    }
    
    const handleGenderChange = (e) => {
        setUser({...user, information : {...user.information, [e.target.name] : e.target.value }})
    }

    const handleBloodTypeChange = (e) => {
        setUser({...user, information : {...user.information, [e.target.name] : e.target.value }})
    }

    const handleAgeChange = (e) => {
        setUser({...user, information : {...user.information, [e.target.name] : e.target.value }})
    }

    const onSubmit = () => {
        setChangeAge(false)
        setChangeGender(false)
        setChangeBloodType(false)
        AuthService.updateProfile(user)
        .then( data => {
            setMsg(data)
        })
    }

    const handleGenderButton = (e) => {
        setChangeGender(true)
    }

    const handleAgeButton = (e) => {
        setChangeAge(true)
    }

    const handleBloodTypeButton = (e) => {
        setChangeBloodType(true)
    }

    const classes = useStyles();

    return (
        <div className="profile">
            <div className="info">
                <div className="gender">
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Gender : {user.information.gender}<br/><br/>
                                <CardActionArea>
                                <CardActions>
                                {changeGender?
                                    <div className="gender_dropdown">
                                        <FormControl className={classes.FormControl}>
                                        <InputLabel>Select gender</InputLabel>
                                        <Select className="dropdown" onChange={ handleGenderChange } name="gender" >
                                            <MenuItem value={'male'}>Male</MenuItem>
                                            <MenuItem value={'female'}>Female</MenuItem>
                                            <MenuItem value={'other'}>Other</MenuItem>
                                            <MenuItem value={'Do not wish to disclose'}>Do not wish to disclose</MenuItem>   
                                        </Select>
                                        </FormControl><br/><br/>
                                        <Button variant="contained" onClick={onSubmit} >Save</Button><br/><br/>
                                        {msg.msgError? <Message  message={msg}/> : null}
                                    </div> : 
                                    <Button size="small" color="primary" onClick={handleGenderButton}>
                                    Change
                                    </Button>
                                    // <Button variant="contained" onClick={handleGenderButton} >Change</Button>
                                }
                                </CardActions>
                                </CardActionArea>

                            </Typography>      
                        </CardContent>
                    </Card>
                </div>
                <div className="age">
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Age : {user.information.age}<br/><br/>
                                <CardActionArea>
                                <CardActions>
                                { changeAge?
                                <form className={classes.root} noValidate autoComplete="off">
                                  <TextField id="outlined-basic" label="age" name="age" variant="outlined" onChange={handleAgeChange}/>
                                  <br/><br/>
                                  <Button variant="contained" onClick={onSubmit} >Save</Button><br/><br/>
                                  {msg.msgError? <Message  message={msg}/> : null}
                                </form>:
                                <Button size="small" color="primary" onClick={handleAgeButton}>
                                    Change
                                </Button>
                                // <Button variant="contained" onClick={handleAgeButton} >Change</Button>
                                }
                                </CardActions>
                                </CardActionArea>
                            </Typography>      
                        </CardContent>
                    </Card>
                </div>
                <div className="bloodType">
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                Blood Type : {user.information.blood_type}<br/><br/>
                                <CardActionArea>
                                <CardActions>
                                {  changeBloodType? 
                                <div className="blood_type_dropdown">
                                    <FormControl className={classes.FormControl}>
                                    <InputLabel>Select blood type</InputLabel>
                                    <Select className="dropdown" onChange={ handleBloodTypeChange } name="blood_type" >
                                        <MenuItem value={'A+'}>A+</MenuItem>
                                        <MenuItem value={'A-'}>A-</MenuItem>
                                        <MenuItem value={'B+'}>B+</MenuItem>
                                        <MenuItem value={'B-'}>B-</MenuItem>
                                        <MenuItem value={'AB+'}>AB+</MenuItem>
                                        <MenuItem value={'AB-'}>AB-</MenuItem>
                                        <MenuItem value={'O+'}>O+</MenuItem>
                                        <MenuItem value={'O-'}>O-</MenuItem>   
                                    </Select>
                                    </FormControl><br/><br/>
                                    <Button variant="contained" onClick={onSubmit} >Save</Button><br/><br/>
                                    {msg.msgError? <Message  message={msg}/> : null}
                                </div> : 
                                <Button size="small" color="primary" onClick={handleBloodTypeButton}>
                                    Change
                                </Button>
                                // <Button variant="contained" onClick={ handleBloodTypeButton } >Change</Button>
                                }
                                </CardActions>
                                </CardActionArea>
                            </Typography>      
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Profile
