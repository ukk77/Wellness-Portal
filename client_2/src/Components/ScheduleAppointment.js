import React, { useState, useContext, useEffect } from 'react'
import './ScheduleAppointment.css'
import AppointmentService from '../Services/AppointmentService'
import { Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    makeStyles,
    CardActions,
    CardActionArea,
    Typography 
} from '@material-ui/core';
import DoctorService from '../Services/DoctorService'
import AuthService from '../Services/AuthService'
import { AuthContext } from '../Context/AuthContext'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {
    DatePicker,
    MuiPickersUtilsProvider
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Message from './Message'

function ScheduleAppointment(props) {
    const { user,setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
    const [doctor, setDoctor] = useState({ doctorType : "" });
    const [result, setResult] = useState(null);
    const [display, setDisplay] = useState(false);
    const [selectedDate, handleDateChange] = useState(new Date());
    const [booking, setBooking] = useState({ patientName : "", bookingDate : null , doctorName : "" })
    const [patientUser, setPatientUser] = useState({ username : "" })
    const [doctorUser, setDoctorUser] = useState({ username : "" })
    const [msg, setMsg] = useState("")
    
    useEffect( async () => {
        let patientname = user.username
        await setBooking({...booking,  patientName : patientname }) 
        await setPatientUser({...patientUser, username : patientname  })
    }, [])

    // useEffect( async () => {
    //     await setBooking({...booking,  bookingDate : selectedDate })
    // }, [selectedDate])


    const handleDateSet = async (date) => {
        await handleDateChange(date)
        await bookingDateChange(date)
    }

    const bookingDateChange = async (date) => {
        let [month, datex, year] = new Date(date).toLocaleDateString("en-US").split("/")
        let dateVar = "" + month.toString() + "-" + datex.toString() + "-" + year.toString()
        await setBooking({...booking,  bookingDate : dateVar })
    }

    const handleDoctorTypeChange = async (e) => {
        await setDoctor({...doctor, [e.target.name] : e.target.value });
        // console.log(patientUser)
    };
      
    const handleDoctorChange = (e) => {
        let docName = e.target.value
        setBooking({...booking,  doctorName : docName })
        setDoctorUser({...doctorUser, username : docName })
    }

    const onSubmit =  async (e) => {
        DoctorService.searchDoctor(doctor)
        .then(data => {
            let tempRes = data.message.msgBody
            setResult(tempRes)
            setDisplay(true) 
        })
    }

    const onSelect = async (e) => {
        // let [month, datex, year] = new Date(date).toLocaleDateString("en-US").split("/")
        // let dateVar = "" + month.toString() + "-" + datex.toString() + "-" + year.toString()
        let booking_str = 'Booking for ' + booking.doctorName + ' on ' + booking.bookingDate        
        const localUser = { username : user.username, bookings : booking_str  }

        let access_updater = { username : doctorUser.username, access_to : user.username }  

        await AppointmentService.bookanappointment(booking)
        .then(data => {
            setMsg(data)
        })

        AuthService.updateBookings(localUser)
        .then(data => data)

        AuthService.updateAccessTo(access_updater)
        .then(data => data)

        props.history.push('/Profile')

    }

    if (!isAuthenticated){
        props.history.push('/Login')
    }

    const useStyles = makeStyles( theme => ({
        FormControl : {
            minWidth : 300,
        },
        root: {
            minWidth: 350,
            maxWidth: 500,
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
          }
    }))

    const classes  = useStyles()

    return (
        <div className="schedule_appointment_form">
        <div className="doctor_select">
        <div>
            <Card className={classes.root}>
            <CardContent>
            <Typography variant="h5" component="h2">
                <FormControl className={classes.FormControl}>
                <InputLabel>Select doctor speciality</InputLabel>
                <Select className="dropdown" onChange={ handleDoctorTypeChange } name="doctorType" >
                    <MenuItem value={'gynecologists'}>Gynecologists</MenuItem>
                    <MenuItem value={'cardiologists'}>Cardiologists</MenuItem>
                    <MenuItem value={'gastroenterologists'}>Gastroenterologists</MenuItem>
                    <MenuItem value={'psychiatrists'}>Psychiatrists</MenuItem>
                    <MenuItem value={'radiologists'}>Radiologists</MenuItem>    
                </Select>
                </FormControl><br/><br/>
                <div>
                    <CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary" onClick={onSubmit}>
                            Search
                        </Button>
                    </CardActions>
                    </CardActionArea>
                </div>
            </Typography>
            </CardContent>
            </Card>
            {
                display? 
                <Card className={classes.root}>
                <CardContent>
                <Typography >
                    <div className="display">
                        <FormControl className={classes.FormControl}>
                        <InputLabel>Select doctor</InputLabel>
                        <Select className="dropdown" onChange={ handleDoctorChange } name="doctorName" >
                                {result.map(res => <MenuItem value={res.name}>
                                        <h5>Doctor Name : {res.name}, &nbsp; Doctor working days : {res.workingDays}, &nbsp;</h5>
                                    </MenuItem>)}
                        </Select>
                        </FormControl><br/><br/>
                    </div>   
                </Typography>
                </CardContent>
                </Card> : null
            }
        </div>
        </div>

        <div className="date_select">
            <Card className={classes.root}>
            <CardContent>
                <Typography>
                    Select Date for visit : <br/><br/>
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker value={selectedDate} onChange={handleDateSet} />
                </MuiPickersUtilsProvider>
                <CardActionArea>
                    <CardActions>
                    <Button size="small" color="primary" onClick={onSelect}>
                        Book
                    </Button>
                    </CardActions>
                </CardActionArea>
            </CardContent>
            </Card>
        </div>

        </div>
    )
}

export default ScheduleAppointment
