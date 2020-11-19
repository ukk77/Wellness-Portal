import React, { useState } from 'react';
import { Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    makeStyles,
    CardActions,
    CardActionArea,
    Typography,
    Divider 
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './SearchForDoctors.css'
import DoctorService from '../Services/DoctorService'
import purple from '@material-ui/core/colors/purple';

// Handles the search doctors page and it's sections
function SearchForDoctors() {
    const [doctor, setDoctor] = useState({ doctorType : "gynecologists" });
    const [result, setResult] = useState(null);
    const [display, setDisplay] = useState(false);

    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 5
            }}
        />
    );

    //This function handles changes to the doctor type search field
    const handleChange = (e) => {
        setDoctor({...doctor, [e.target.name] : e.target.value });
    };
      
    //This function uses the doctorservice method of searchDoctor to search for the type of doctor selected by the user
    const onSubmit =  async (e) => {
        DoctorService.searchDoctor(doctor)
        .then(data => {
            if(data.length!==0){
            let tempRes = data.message.msgBody
            setResult(tempRes)
            setDisplay(true) 
        }
        })
    }

    //Style function that defines the style for the mentioned classes
    const useStyles = makeStyles( theme => ({
        FormControl : {
            minWidth : 300,

        },
        root: {
            minWidth: 400,
            maxWidth: 500,
            margin: 10,
           
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
        <div className="search_form">
            <div>
            <Card className={classes.root}>
            <CardContent>
            <Typography variant="h5" component="h2">
                <FormControl className={classes.FormControl}>
                <h4 style={{fontFamily:"Book Antiqua"}}>Select doctor speciality</h4>
                <Select className="dropdown" value={doctor.doctorType} onChange={ handleChange } name="doctorType" >
                    <MenuItem value={'gynecologists'}>Gynecologists</MenuItem>
                    <Divider/>
                    <MenuItem value={'cardiologists'}>Cardiologists</MenuItem>
                    <Divider/>
                    <MenuItem value={'gastroenterologists'}>Gastroenterologists</MenuItem>
                    <Divider/>
                    <MenuItem value={'psychiatrists'}>Psychiatrists</MenuItem>
                    <Divider/>
                    <MenuItem value={'radiologists'}>Radiologists</MenuItem>    
                    <Divider/>
                </Select>
                </FormControl><br/><br/>
                <CardActionArea>
                <CardActions>
                    <Button  size="small" color="primary" onClick={onSubmit}>
                        Search
                    </Button>
                </CardActions>
                </CardActionArea>
            </Typography>
            </CardContent>
            </Card>
            
            </div>

            <div>
            {/* Hidden section that appears when a doctor type is selected */}
                {display? 
                    <div className="display">
                        <ul>
                            {result.map(res => <li >
                                    <h5>Doctor Name : {res.name}</h5>
                                    <h5 style={{marginTop:"-5px"}}>Doctor Speciality : {res.speciality}</h5>
                                    <h5 style={{marginTop:"-5px"}}>Doctor working days : {res.workingDays}</h5>
                                    <h5 style={{marginTop:"-5px"}}>Doctor Qualification : {res.qualification}</h5>
                                    <h5 style={{marginTop:"-5px"}}>Doctor experience : {res.experience}</h5>
                                    <ColoredLine color={purple}/>
                            
                                </li>)}
                        </ul>
                    </div>  : null}
            </div>
        </div>
    )
}

export default SearchForDoctors
