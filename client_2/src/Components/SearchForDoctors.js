import React, { useState } from 'react';
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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './SearchForDoctors.css'
import DoctorService from '../Services/DoctorService'
import purple from '@material-ui/core/colors/purple';

function SearchForDoctors() {
    const [doctor, setDoctor] = useState({ doctorType : "" });
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

    const handleChange = (e) => {
        setDoctor({...doctor, [e.target.name] : e.target.value });
    };
      
    const onSubmit =  async (e) => {
        DoctorService.searchDoctor(doctor)
        .then(data => {
            let tempRes = data.message.msgBody
            setResult(tempRes)
            setDisplay(true) 
        })
    }


    const useStyles = makeStyles( theme => ({
        FormControl : {
            minWidth : 300,
        },
        root: {
            minWidth: 400,
            maxWidth: 500,
            margin: 10
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
                <InputLabel>Select doctor speciality</InputLabel>
                <Select className="dropdown" onChange={ handleChange } name="doctorType" >
                    <MenuItem value={'gynecologists'}>Gynecologists</MenuItem>
                    <ColoredLine color={purple}/>
                    <MenuItem value={'cardiologists'}>Cardiologists</MenuItem>
                    <ColoredLine color={purple}/>
                    <MenuItem value={'gastroenterologists'}>Gastroenterologists</MenuItem>
                    <ColoredLine color={purple}/>
                    <MenuItem value={'psychiatrists'}>Psychiatrists</MenuItem>
                    <ColoredLine color={purple}/>
                    <MenuItem value={'radiologists'}>Radiologists</MenuItem>    
                    <ColoredLine color={purple}/>
                </Select>
                </FormControl><br/><br/>
                <CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={onSubmit}>
                        Search
                    </Button>
                </CardActions>
                </CardActionArea>
            </Typography>
            </CardContent>
            </Card>
            
            </div>

            <div>
                {display? 
                    <div className="display">
                        <ul>
                            {result.map(res => <li >
                                    <h5>Doctor Name : {res.name}</h5>
                                    <h5>Doctor Speciality : {res.speciality}</h5>
                                    <h5>Doctor working days : {res.workingDays}</h5>
                                    <h5>Doctor Qualification : {res.qualification}</h5>
                                    <h5>Doctor experience : {res.experience}</h5>
                                    <ColoredLine color={purple}/>
                                    <ColoredLine color={purple}/>
                                </li>)}
                        </ul>
                    </div>  : null}
            </div>
        </div>
    )
}

export default SearchForDoctors
