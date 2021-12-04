const express = require("express");
const bodyParser = require("body-parser");

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
	host:'smtp.gmail.com',
	port:587,
	secure:false,
  auth: {
    user: "dharmjat45@gmail.com",
    pass: 'lmohvrjwmseorzbm',
  },
});


/////////////////





//////////////////////////////
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/signup");
const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});


/////////////////////////////

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
	bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/sign_up", function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const pass = req.body.password;
  const phone = req.body.phone;
  
  const data = {
    name: name,
    email: email,
    password: pass,
    phone: phone,
  };
  
db.collection("details").insertOne(data, function (err, collection) {
	  if (err) throw err; 

	  if (!!collection){
		const mailOptions = {
			from: "dharmjat45@gmail.com",
			to: email,
			subject: "Company Name",
			text: "welcome to our startup",
		  };
		  
		  transporter.sendMail(mailOptions,function(err, info){
				  if(err){
				  console.log(err);
			  }else{
					  console.log('Email sent : '+ info.response);
				  }
		  })

	  }
	  console.log("Record inserted Successfully");
  });
  
  return res.redirect("signup_success.html");
});

app 
.get("/", function (req, res) {
    res.set({
		"Access-control-Allow-Origin": "*",
    });
    return res.redirect("index.html");
})
.listen(3000);

console.log("server listening at port 3000");
