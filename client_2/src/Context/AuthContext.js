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

    //[] in the end of useEffect acts as the component did mount lifecycle method
    const getInfo = async (name) => {
        await AuthService.getUserInfo(name)
       .then( data => {
           setPatientData(patientData => [...patientData, data ])
       })
    }

    useEffect(async () => {
        await AuthService.isAuthenticated().
        then( data => {
            setUser(data.user)
            setIsAuthenticated(data.isAuthenticated)
            setIsLoaded(true)
            if(data.user.role === "Doctor"){
                data.user.access_to.map(
                    res => {
                        getInfo({ username : res })
                    }
                )
            }
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
