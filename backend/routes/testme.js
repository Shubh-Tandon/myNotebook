
const express = require("express");


const formData = new FormData();
const name = "Shubh"
const code = "3667dfe4a66089c51620ee63ed2db0c3"

formData.append("name",name )
formData.append('code', code);

fetch('https://dev.29kreativ.com/recruitment/levels/',{
    method: 'POST',
    headers: {
        'Authorization': 'Bearer' + code
    },
    body: formData,
}).then(response => {
    response.send(formData)
}).catch(err =>{
    console.log(err);
})