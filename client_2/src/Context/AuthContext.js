import React, { createContext, useState, useEffect  } from 'react';
import AuthService from '../Services/AuthService'

//Context api used to setup global state
//Authcontext object gives a provider and a consumer, so anything wrapped in a provider will have access to global state
export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [patientData, setPatientData] = useState([])

    //getInfo function is used when a doctor logs in.
    /*This function gets data for all those patients that the authenticated doctor has access to i.e the patients that 
    have an appointment with this doctor*/
    const getInfo = async (name) => {
        await AuthService.getUserInfo(name)
       .then( data => {
        setPatientData(patientData => [...patientData, data ])
       })
    }

    //[] in the end of useEffect acts as the component did mount lifecycle method
    useEffect(async () => {
        await AuthService.isAuthenticated().
        then( data => {
            setUser(data.user)
            setIsAuthenticated(data.isAuthenticated)
            if(data.user.role === "Doctor"){
                data.user.access_to.map(
                    res => {
                        getInfo({ username : res })
                    }
                )
            }
            setIsLoaded(true)
        })
    },[])
    
    return (
        <div>
            {!isLoaded? <h1>Loading</h1> : 
                <AuthContext.Provider value={{ user,setUser, isAuthenticated, setIsAuthenticated, patientData, setPatientData }}>
                    {children}
                </AuthContext.Provider>}
        </div>
    )

}
