import { Divider } from '@material-ui/core';
import React, { createContext, useState, useEffect  } from 'react';
import AuthService from '../Services/AuthService'

//Context api used to setup global state
//Authcontext object gives a provider and a consumer, so anything wrapped in a provider will have access to global state
export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    //[] in the end of useEffect acts as the component did mount lifecycle method
    useEffect(() => {
        AuthService.isAuthenticated().
        then(data => {
            setUser(data.user)
            setIsAuthenticated(data.isAuthenticated)
            setIsLoaded(true)
        })
    },[])
    
    return (
        <div>
            {!isLoaded? <h1>Loading</h1> : 
                <AuthContext.Provider value={{ user,setUser, isAuthenticated, setIsAuthenticated }}>
                    {children}
                </AuthContext.Provider>}
        </div>
    )

}
