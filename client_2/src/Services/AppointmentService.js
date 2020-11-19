export default{
    //Method to send request to the route appointment/bookanappointment, which books an appointment
    bookanappointment : booking => {
        return fetch('appointment/bookanappointment',{
            method: 'POST',
            body: JSON.stringify(booking),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => data)
    }
}