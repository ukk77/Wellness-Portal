export default{
    // addDoctor : (doctor) => {
    //     return fetch('/doctors/adddoctors')
    //     .then(res => res.json())
    //     .then(data => data)
    // }

    searchDoctor : (doctorType) => {
        return fetch('/doctors/searchdoctors', {
            method : 'POST',
            body: JSON.stringify(doctorType),
            headers: {
                'Content-Type': 'application/json'
            } 
        })
        .then(res => {
            if (res.status !== 500){
                return res.json().then(data => data)
            }
            else {
                return {message:{ msgBody: "Error has occured", msgError : true }}
            }
        })
        
    }
}