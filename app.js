const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https =require("https");
const { options } = require("request");
const { write } = require("fs");
const { STATUS_CODES } = require("http");
const app=express();
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html"); 
})
app.use(bodyParser.urlencoded({extended:true}));

app.post("/", function(req,res){
    const FName=req.body.fName;
    const LName=req.body.lName;
    const Email=req.body.email;
    const data={
        members:[{
            email_address:Email,
            status: "subscribed",
            merge_fields:{
                FNAME: FName,
                LNAME: LName
            }
        }
      ]
    };
    var jsonData =JSON.stringify(data);
    const url="https://us8.api.mailchimp.com/3.0/lists/82c60d8891";
    const options={
        method:"POST",
        auth:"Nikhil:07121d094177aec8a28aabffb4d94b14-us8"
    }
    const request=https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else
        res.sendFile(__dirname+"/failure.html")
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

    })
    request.write(jsonData);
    request.end();
    
})
app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(process.env.PORT || 3000,function(){
    console.log("Server started in port 3000")
})

//07121d094177aec8a28aabffb4d94b14-us8
//82c60d8891