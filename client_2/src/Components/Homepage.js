import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import './Homepage.css'
import Nav from './Nav'

//Homepage component 
function Homepage() {
	//history object from the react router that is used for navigation and path setting
	const history = useHistory();
	
	return (
		<div className="home">
		<div className="text">
			<h3>
				Hello! <br/>
				Welcome to the Wellness Portal!<br/>
				How may we help you today?
			</h3>
		</div>
		</div>
    )
}

export default Homepage
