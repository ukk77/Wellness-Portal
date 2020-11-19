import React, { Component } from 'react';
import './view.css'

//viewappointment Component used in the appointment component to display individual patients data 
class ViewAppointment extends Component {
    constructor(props){
        super(props);
        this.state={
            appointments:null,
        }
    }
    render() {
        return (
            
            <>
            <div className="Heading"> 
                 My Scheduled Appointments
            </div>
                {this.props.appointments.map((eachPatient) => {
                    
                    return <>
                    <div className="container">
                        <div className="innerContent"><p className="title">Patient Name</p><p className="content">{eachPatient.user.firstName + " " + eachPatient.user.lastName}</p></div>
                        <div className="innerContent"><p className="title">Age</p><p className="content">{eachPatient.user.info.age}</p></div>
                        <div className="innerContent"><p className="title">Gender</p><p className="content">{eachPatient.user.info.gender}</p></div>
                        <div className="innerContent"><p className="title">Blood Type</p><p className="content">{eachPatient.user.info.blood_type}</p></div>
                        <div className="innerContent"><p className="title">Booking Date and Time</p><p className="content">{eachPatient.user.bookings[eachPatient.user.bookings.length-1].substring(20)}</p></div>
                    </div>
                    </>
                })} 
            </>
        );
    }
}

export default ViewAppointment;