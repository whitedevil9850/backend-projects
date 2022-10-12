const bodyParser = require('body-parser')
const express = require('express')
const request = require('request')
const https = require('https')

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.get("/" , (req,res) => {
    res.sendFile(`${__dirname}/signup.html`)
    
   
})

app.post("/" , (req,res) => {
    const fname = req.body.FirstName;
    const lname = req.body.LastName;
    const email = req.body.Email;


   var data = {
    members : [
       {
        email_address: email,
        status: "subscribed",
        merge_fields : {
            FNAME: fname,
            LNAME: lname
        }
       }
    ]
   }
   const jsonData = JSON.stringify(data)
   const url = 'https://us10.api.mailchimp.com/3.0/lists/5745549d76';

   const options ={
    method:'post',
    auth: 'rushim:3f4b5847b3c9d3da763147905e8d0b7f-us10'
   }


const request = https.request(url, options , (response) => {

        if(response.statusCode == 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }


        response.on("data",(data) => {
            console.log(JSON.parse(data))
        })
   })

   request.write(jsonData)
   request.end();

})

app.post("/failure" , (req,res) => {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("server is started on port 3000")
})
//api key
//3f4b5847b3c9d3da763147905e8d0b7f-us10

//Audiance Id or list id
//5745549d76