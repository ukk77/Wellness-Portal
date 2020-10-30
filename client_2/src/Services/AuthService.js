export default {
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
    
    logout : () =>{
        return fetch('/user/logout')
                .then(res => res.json())
                .then(data => data)
    },

    isAuthenticated : () => {
        return fetch('/user/authenticated')
                .then(res => {
                    if (res.status !== 401){
                        return res.json().then(data => data)
                    }
                    else {
                        return {isAuthenticated : false, user : {username : "", firstName : "", lastName : "", dateOfBirth : new Date(), role : "", bookings : [], access_to : [], information : 
                        { gender : "", age : 0, blood_type : "" }}}
                    }
                } )
    },

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

    updateAccessTo : user => {
        return fetch('user/updateaccessto', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data)
    }

}