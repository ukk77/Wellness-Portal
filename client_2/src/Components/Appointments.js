import React, {useContext} from 'react'
import { AuthContext } from '../Context/AuthContext'
import Typography from '@material-ui/core/Typography';
import { 
    makeStyles,
    Divider,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ViewAppointment from './viewAppointments'

function Appointments(props) {
    const { user,setUser, isAuthenticated, setIsAuthenticated, patientData } = useContext(AuthContext)

    if (!isAuthenticated){
        props.history.push('/Login')
    }
    else if (user.role !== "Doctor"){
        props.history.push('/')
    }
    
    const useStyles = makeStyles((theme) => ({
        root: {
          width: '40%',
          marginLeft: '25%',
          marginTop: '10%'
        },
        heading: {
          fontSize: theme.typography.pxToRem(15),
          fontWeight: theme.typography.fontWeightRegular
        },
    }));
    const classes = useStyles();


    return (    
        <div className="show_appointments">

        <ViewAppointment appointments={patientData}/>

            {
            //     <div className={classes.root}>
            //             {
            //             patientData.map(patient => 
            //                 <Accordion>
            //                 <AccordionSummary 
            //                 expandIcon={<ExpandMoreIcon />}
            //                 aria-controls="panel1a-content"
            //                 id="panel1a-header">
            //                     <Typography className={classes.heading}><b>Name</b> : {patient.user.firstName + " " + patient.user.lastName}</Typography>
            //                 </AccordionSummary>
            //                 <Divider/>
            //                 <AccordionDetails>
            //                     <Typography>
            //                         <b>Gender</b> : {patient.user.info.gender}<br/>
            //                         <b>Blood Type</b> : {patient.user.info.blood_type}<br/>
            //                         <b>Age</b> : {patient.user.info.age}<br/>
            //                     </Typography>
            //                 </AccordionDetails>
            //                 </Accordion>
            //             )
            //         }
            // </div>
        }
        </div>
    )
}

export default Appointments
