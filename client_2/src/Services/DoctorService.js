export default{

    //Method to send request to the route doctor/searchdoctors, which searches for a doctor given the doctor type
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