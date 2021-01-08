
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 3000, function(){console.log("Server is up and running.")});



app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(request, response){
    var firstName = request.body.firstName;
    var lastName = request.body.lastName;
    var email = request.body.email;
    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                      FNAME: firstName,
                      LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);
    const url = "https://us7.api.mailchimp.com/3.0/lists/3ddbd6a318";
    const options = {
        method: "POST",
        auth: "XXXXXX" // API key goes here
    }
    
    const myRequest = https.request(url, options, function(mailRes){
        if(mailRes.statusCode === 200) {
            response.sendFile(__dirname + "/success.html");
        }
        else {
            response.sendFile(__dirname + "/failure.html");
        }
    });
    myRequest.write(jsonData);
    myRequest.end();
});

 
