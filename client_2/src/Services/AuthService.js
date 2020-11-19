export default {
    //Method to send request to the route user/login, which authenticates a user
    login : user => {
        return fetch('/user/login',{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401){
                return res.json().then(data => data)
            }
            else {
                return {isAuthenticated : false, user : {username : "",  firstName : "", lastName : "", dateOfBirth : new Date(), role : "", bookings : [], access_to : [], information : 
                { gender : "", age : 0, blood_type : "" }}}
            }
        })
    },

    //Method to send request to the route user/register, which registers a user
    register : user => {
        return fetch('/user/register',{
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
    },
    
    //Method to send request to the route user/logout, which logs  a user out
    logout : () =>{
        return fetch('/user/logout')
                .then(res => res.json())
                .then(data => data)
    },

    //Method to send request to the route user/authenticated, which checks if a user is authenticated
    isAuthenticated : () => {
        return fetch('/user/authenticated')
                .then(res => {
                    if (res.status !== 401){
                        return res.json().then(data => data)
                    }
                    else {
                        return {isAuthenticated : false, user : {username : "", firstName : "", lastName : "", dateOfBirth : "", role : "", bookings : [], access_to : [], information : 
                        { gender : "", age : 0, blood_type : "" }}}
                    }
                } )
    },

    //Method to send request to the route user/updateprofile, which updates a users profile based on the changes made by him
    updateProfile : user => {
        return fetch('user/updateprofile', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => data)
            
    },

    //Method to send request to the route user/getUserId, which fetches the id of a user given the username
    getUserId : user => {
        return fetch('user/getUserId', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
    },

    //Method to send request to the route user/updaterole, which updates teh role of a user
    //Only accessible via postman i.e to admins only
    updateRole : user => {
        return fetch('user/updaterole', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
    },

    /*Method to send request to the route user/updatebookings, 
    which updates the users bookings based on the appointment scheduled by the user*/
    updateBookings : user => {
        return fetch('user/updatebookings', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
    },

    /*Method to send request to the route user/updateaccessto, 
    which updates a doctors access to field based on appointments made by users*/
    updateAccessTo : user => {
        return fetch('user/updateaccessto', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
    },

    //Method to send request to the route user/getUserInfo, which fetches a user's info
    getUserInfo : user => {
        return fetch('user/getUserInfo', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
    }

}