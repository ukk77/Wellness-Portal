export default{
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