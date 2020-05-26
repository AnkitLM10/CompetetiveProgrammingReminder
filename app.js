var express=require('express');
var app=express();
var bodyParser = require("body-parser");
app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var fs = require('fs');
const axios = require('axios');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
var request = require('request');
var cheerio = require('cheerio');
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;
const url= "mongodb+srv://test:test@cluster0-5pdje.mongodb.net/test";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//  Mail Initialisation
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var validator = require("email-validator");




var MongoClient = require('mongodb').MongoClient;
//const url= "mongodb+srv://test:test@cluster0-5pdje.mongodb.net/test";
app.use('/assets',express.static('assets'));



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'buzzcricbuzz@gmail.com',
    pass: 'Ankit.singh364'
  }
});

var mailOptions = {
  from: 'buzzcricbuzz@gmail.com',
  to: 'ankit.1513017@kiet.edu',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};


// stuff for mailing to user *************************


function theGame(){
var uri = 'https://www.stopstalk.com/contests';
axios.get(uri)
.then(response=>{
  const html = response.data;
var $ = cheerio.load(html);

var a=1;

$('tr').filter(function(){



if($(this).children(':nth-child('+3+')').attr('class')==='stopstalk-timestamp')
{
var dateString =  $(this).children(':nth-child('+3+')').text();
 dateTimeParts = dateString.split(' '),
 timeParts = dateTimeParts[1].split(':'),
    dateParts = dateTimeParts[0].split('-'),


date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1]);
//console.log(new Date().getTime());
//console.log(date.getTime()); //1379426880000
//console.log(date)

var difference = date.getTime() - new Date().getTime();

        var daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24

       var hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60

        var minutesDifference = Math.floor(difference/1000/60);
        difference -= minutesDifference*1000*60

        var secondsDifference = Math.floor(difference/1000);


	if(daysDifference==0)
	{
		//here goes the code.............


if(daysDifference===0 &&  hoursDifference==6 && minutesDifference>=13 && minutesDifference<=30)
{


    	 console.log( $(this).children(':nth-child('+1+')').text());
       console.log(  $(this).children(':nth-child('+2+')').children(':nth-child('+1+')').attr('title'));
       console.log($(this).children(':nth-child('+3+')').text());
       console.log('difference = ' + daysDifference + ' day/s ' + hoursDifference + ' hour/s ' + minutesDifference + ' minute/s ' + secondsDifference + ' second/s ');

  //*************************************************************************************
  mailOptions.text= $(this).children(':nth-child('+2+')').children(':nth-child('+1+')').attr('title')+"\n Starting at\n"+$(this).children(':nth-child('+3+')').text();
  mailOptions.subject=$(this).children(':nth-child('+1+')').text();

       transporter.sendMail(mailOptions, function(error, info){
         if (error) {
           console.log(error);
         } else {
           console.log('Email sent: ' + info.response);
         }
       });
  //***************************************************************************
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").find({}).toArray(function(err, result) {
      if (err) throw err;
      for(var j=0;j<result.length;j++)
    {
    mailOptions.to=result[j].email;
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
      db.close();
    });
  });




}


/*

*/

	}
}









});








});
}






setInterval(theGame, 900000);



// stuff ends for mailing the contest here******************









var http = require("http");
setInterval(function() {
    http.get("http://ankit249.herokuapp.com/");

}, 20*60*1000);










app.get('/*', function(req,res)
{

  var upcoming = [];
  var ongoing = [];
  var uri = 'https://www.stopstalk.com/contests';
  axios.get(uri)
  .then(response=>{
    const html = response.data;
  var $ = cheerio.load(html);

  $('tr').filter(function(){


    if($(this).children(':nth-child('+3+')').attr('class')==='stopstalk-timestamp')
    {
      var event = {
          "name":$(this).children(':nth-child('+1+')').text(),
           "site":$(this).children(':nth-child('+2+')').children(':nth-child('+1+')').attr('title'),
           "startTime":$(this).children(':nth-child('+3+')').text(),
           "duration":$(this).children(':nth-child('+4+')').text()
      };
      upcoming.push(event);
    }
    else if(($(this).children(':nth-child('+3+')').text()==='-') {
    var time = $(this).children(':nth-child('+4+')').text();



  var event = {
      "name":$(this).children(':nth-child('+1+')').text(),
       "site":$(this).children(':nth-child('+2+')').children(':nth-child('+1+')').attr('title'),
      "time":time
  };
  ongoing.push(event);
    }

     });

    // ongoing.forEach(element => console.log(element));
     console.log('inside');
     res.render('index',{ongoing:ongoing,upcoming:upcoming,email:""});

  });

  //************************

});



//*******************************************************************************************************************
app.post('/emailRegister',function(req,res){
var ifEmailRegister="";


var isValidEmail = validator.validate(req.body.email);
if(isValidEmail==true)
{
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { email: req.body.email };
  dbo.collection("customers").findOne({email:req.body.email}, function(err, result) {
      if (err) throw err;

      if(result!=null)
        {

        console.log(result.email+"   already existes");
// The email already exists hence we need to remove the email........................
dbo.collection("customers").deleteOne({email:req.body.email}, function(err, obj) {
  if (err) throw err;
  console.log("1 document deleted");
  db.close();
});

ifEmailRegister = "Email successfully deleted!."


        }
        else {
// The email is not registered hence we have to add this email..............................
       console.log("we have to insert the email!.");
ifEmailRegister = "Email successfully registered!."
       dbo.collection("customers").insertOne({email:req.body.email}, function(err, res) {
         if (err) throw err;
         console.log("1 document inserted");
         db.close();
       });


       }

      db.close();
    });
});
}
else {

ifEmailRegister="Please enter correct email."

}



// Fetching the result before updating the result to ejs

//**************************************************************************
var upcoming = [];
var ongoing = [];
var uri = 'https://www.stopstalk.com/contests';
axios.get(uri)
.then(response=>{
  const html = response.data;
var $ = cheerio.load(html);

$('tr').filter(function(){


  if($(this).children(':nth-child('+6+')').children(':nth-child('+1+')').attr('data-tooltip')==='Set Reminder to Google Calendar')
  {
    var event = {
        "name":$(this).children(':nth-child('+1+')').text(),
         "site":$(this).children(':nth-child('+2+')').children(':nth-child('+1+')').attr('title'),
         "startTime":$(this).children(':nth-child('+3+')').text(),
         "duration":$(this).children(':nth-child('+4+')').text()
    };
    upcoming.push(event);
  }
  else if($(this).children(':nth-child('+6+')').children(':nth-child('+1+')').attr('data-tooltip')==='Already started!') {
  var time = $(this).children(':nth-child('+4+')').text();



var event = {
    "name":$(this).children(':nth-child('+1+')').text(),
     "site":$(this).children(':nth-child('+2+')').children(':nth-child('+1+')').attr('title'),
    "time":time
};
ongoing.push(event);
  }

   });

   //ongoing.forEach(element => console.log(element));
   console.log('inside');
   res.render('index',{ongoing:ongoing,upcoming:upcoming,email:ifEmailRegister});

});



















/*


*/


});
//**********************************************************************************************************************











var server=app.listen(process.env.PORT);
