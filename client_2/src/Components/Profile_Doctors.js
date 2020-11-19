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
    ListItem,
    ListItemText,
    Divider
} from '@material-ui/core';
import {
    DatePicker,
    MuiPickersUtilsProvider
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './Profile_doctors.css'
import Message from './Message'

//Profile component that shows a doctor's profile 
function Profile_Doctors(props) {
    const { user,setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const [msg,setMsg] = useState("")
    const [changeGender, setChangeGender] = useState(false)
    const [changeAge, setChangeAge] = useState(false)
    const [changeBloodType, setChangeBloodType] = useState(false)
    const [changeFirstName, setChangeFirstName] = useState(false)
    const [changeLastName, setChangeLastName] = useState(false)
    const [changeDateOfBirth, setChangeDateOfBirth] = useState(false)
    const [selectedDate, handleDateChange] = useState(new Date());
    
    // styling for different elements in this component
    const useStyles = makeStyles({
        root: {
          minWidth: 310,
          maxWidth: 375,
          margin: 1,
         
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
            marginRight : 10,
        },
        demo: {
          },
        list:{
            padding : 20,
            width: '100%',
            maxWidth: 825,
            alignContent: 'center',
            maxHeight : 200,
            overflow : 'auto',
            
        },
        bookingCard : {
            minWidth: 935,
            maxWidth: 935,
            margin: 1,
            
        }
    });
    
    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 5
            }}
        />
    );

    //Checks to see if the user accessing the page is authenticated or not, if not the user is redirected to the login page
    if (!isAuthenticated){
        props.history.push('/Login')
    }

    //Checks to see if the user accessing the page has the role of a doctor or not, if not the user is redirected to the home page
    if(user.role !== "Doctor"){
        props.history.push('/')
    }
    
    //Handles date of birth changes
    const handleDateSet = async (date) => {
        let [month, datex, year] = new Date(date).toLocaleDateString("en-US").split("/")
        let dateVar = "" + month.toString() + "-" + datex.toString() + "-" + year.toString()
        await setUser({...user, dateOfBirth : dateVar })
    }

    //Handles gender field changes
    const handleGenderChange = (e) => {
        setUser({...user, information : {...user.information, [e.target.name] : e.target.value }})
    }

    //Handles blood type field changes
    const handleBloodTypeChange = (e) => {
        setUser({...user, information : {...user.information, [e.target.name] : e.target.value }})
    }

    //Handles age field changes
    const handleAgeChange = (e) => {
        // let numsRegex = new RegExp("/^\d+$/")
        // if (numsRegex.test(e.target.value)){
            setUser({...user, information : {...user.information, [e.target.name] : e.target.value }})
        // }
        // else{
        //     // setMsg({msgBody:})
        //     e.target.value = ""
        //     alert("Please enter digits only")
        // }
    }

    //Handles first name field changes
    const handleFirstNameChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value })
    }

    //Handles lastname field changes
    const handleLastNameChange = (e) => {
        setUser({...user, [e.target.name] : e.target.value })
    }

    
    // const handleDateOfBirthChange = (e) => {
    //     setUser({...user, [e.target.name] : e.target.value })
    // }

        /*This function uses the Authservice update profile function to update the user's 
    profile based on the changes made by him*/
    const onSubmit = () => {
        setChangeAge(false)
        setChangeGender(false)
        setChangeBloodType(false)
        setChangeFirstName(false)
        setChangeLastName(false)
        setChangeDateOfBirth(false)
        AuthService.updateProfile(user)
        .then( data => {
            setMsg(data)
        })
    }

    //Works when the change button for gender field is clicked
    const handleGenderButton = (e) => {
        setChangeGender(true)
    }

    //Works when the change button for age field is clicked
    const handleAgeButton = (e) => {
        setChangeAge(true)
    }

    //Works when the change button for blood type field is clicked
    const handleBloodTypeButton = (e) => {
        setChangeBloodType(true)
    }

    //Works when the change button for first name field is clicked
    const handleFirstNameButton = (e) => {
        setChangeFirstName(true)
    }

    //Works when the change button for last name field is clicked
    const handleLastNameButton = (e) => {
        setChangeLastName(true)
    }

    //Works when the change button for date of birth field is clicked
    const handleDateOfBirthButton = (e) => {
        setChangeDateOfBirth(true)
    }

    const classes = useStyles();

    return (
        <div className="profile">
            <div className="info1">
                <div className="firstName">
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                           <p> FirstName :{user.firstName}</p> <br/><br/>
                            <CardActionArea>
                            <CardActions>
                            { changeFirstName?
                                <form className={classes.root} noValidate autoComplete="off">
                                  <TextField id="outlined-basic" label="firstName" name="firstName" variant="outlined" onChange={handleFirstNameChange}/>
                                  <br/><br/>
                                  <Button variant="contained" onClick={onSubmit} >Save</Button><br/><br/>
                                  {msg.msgError? <Message  message={msg}/> : null}
                                </form>:
                                <Button size="small" color="primary" onClick={handleFirstNameButton}>
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

                <div className="lastName">
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                        <p>  LastName : {user.lastName}</p><br/><br/>
                            <CardActionArea>
                            <CardActions>
                            { changeLastName?
                                <form className={classes.root} noValidate autoComplete="off">
                                  <TextField id="outlined-basic" label="lastName" name="lastName" variant="outlined" onChange={handleLastNameChange}/>
                                  <br/><br/>
                                  <Button variant="contained" onClick={onSubmit} >Save</Button><br/><br/>
                                  {msg.msgError? <Message  message={msg}/> : null}
                                </form>:
                                <Button size="small" color="primary" onClick={handleLastNameButton}>
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

                <div className="dob">
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                           <p> Date of Birth : {user.dateOfBirth.slice(0, 10)}</p><br/><br/>
                            <CardActionArea>
                            <CardActions>
                                {   
                                    changeDateOfBirth?
                                    <div>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <DatePicker value={selectedDate} onChange={handleDateSet} />
                                    </MuiPickersUtilsProvider>
                                    <Button size="small" color="primary" onClick={onSubmit}>
                                        Save
                                    </Button>
                                    </div> :
                                    
                                    <Button size="small" color="primary" onClick={handleDateOfBirthButton}>
                                    Change
                                    </Button>
                                    
                                    
                                }
                            </CardActions>
                            </CardActionArea>

                        </Typography>      
                    </CardContent>
                </Card>
                </div>
            </div>
            <div className="info">
                <div className="gender">
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography variant="h5" component="h2">
                            <p> Gender : {user.information.gender} </p><br/><br/>
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
                            <p>   Age : {user.information.age}</p><br/><br/>
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
                            <p> Blood Type : {user.information.blood_type}</p><br/><br/>
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

export default Profile_Doctors
