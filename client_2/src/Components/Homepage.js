import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import './Homepage.css'
import Nav from './Nav'

function Homepage() {
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
