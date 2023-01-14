/**************************************************************************************************************************************************

                                                    GENERAL SETUP AND IMPORTS

**************************************************************************************************************************************************/
require('dotenv').config()
// Import express, and initialize it as a constant
const express = require("express");
// Import EJS, and initialize it as a constant
const ejs = require("ejs");
// Import body-parser, and initialize it as a constant
const bodyParser = require("body-parser");
// Setup app using express
const app = express();
const https = require("https");
const request = require("request");
const nodemailer = require("nodemailer");

// Set up the server using the view engine
app.set('view engine', 'ejs');
// Use body-parser, with .url-encoded and add extended: True
app.use(bodyParser.urlencoded({extended: true}));
// Tells express our static files like CSS are in the public folder
app.use(express.static(__dirname + '/public'));
/**************************************************************************************************************************************************

                                                    GET METHODS

**************************************************************************************************************************************************/


// Email






// API Request

// Declare this variable in global scope, we will change it inside the request and then output to the page
let quote;

// Get request to Home page: render the main.ejs page
app.get("/", function(req, res) {
    // first make a request to the quotes.net api, then put that into the ejs variable on the main page - temporarily commented out so I don't exceed the requests limit
    
    
    request("https://www.abbreviations.com/services/v2/quotes.php?uid="+ process.env.API_USER_ID +"&tokenid=" + process.env.API_TOKEN + "&searchtype=AUTHOR&query=Napoleon+Bonaparte&format=json", { json: true }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    // essentially, generate a random number between 1 and the length of the list, and then output the quote at that index
    quote = body.result[Math.floor((Math.random() * body.result.length) + 1)].quote;
    });

    // render main page, with the quote being a random quote
  res.render("main",{quote: quote});
});


// Get request to domestic policy page: render dompol page
app.get("/domestic-policy", function(req, res){
    res.render("dompol-personal-template", {
                introduction: "Introduction",
                introparagraph: process.env.DOMPOLINTROTEXT,
                heading1: "Legal Reforms and the Napoleonic Code",
                paragraph1: process.env.DOMPOLTEXT1,
                paragraph2: process.env.DOMPOLTEXT2,
                paragraph3: process.env.DOMPOLTEXT3,
                paragraph4: process.env.DOMPOLTEXT4,
                paragraph5: process.env.DOMPOLTEXT5,
                heading2: "Destruction of the Republic",
                paragraph6: process.env.DOMPOLTEXT6,
                paragraph7: process.env.DOMPOLTEXT7,
                heading3: "Slavery",
                paragraph8: process.env.DOMPOLTEXT8,
                paragraph9: process.env.DOMPOLTEXT9,
                paragraph10: process.env.DOMPOLTEXT10,
                paragraph11: process.env.DOMPOLTEXT11,
                imageURL1: process.env.DOMPOLIMAGEURL1,
                caption1: "The Napoleonic Code",
                imageURL2: process.env.DOMPOLIMAGEURL2,
                caption2: "The Louisiana Purchase"
               });
});
    



// Get request to personal page: render dompol page 
app.get("/personal", function(req, res){
    res.render("dompol-personal-template", {
                introduction: "Introduction",
                introparagraph: process.env.PERSONALINTROTEXT,
                heading1: "Early Life",
                paragraph1: process.env.PERSONALTEXT1,
                paragraph2: "",
                paragraph3: "",
                paragraph4: "",
                paragraph5: "",
                heading2: "Love, Family and Relationships",
                paragraph6: process.env.PERSONALTEXT2,
                paragraph7: process.env.PERSONALTEXT3,
                heading3: "Death",
                paragraph8: process.env.PERSONALTEXT4,
                paragraph9: "",
                paragraph10: "",
                paragraph11: "",
                imageURL1: process.env.PERSONALIMAGEURL1,
                caption1: "Napoleon at Versailles",
                imageURL2: process.env.PERSONALIMAGEURL2,
                caption2: "Joséphine de Beauharnais"
               });
});

// Get request to foreign policy page: render forpol page
app.get("/foreign-policy", function(req, res) {
    res.render("forpol");
});

// Get request to military page: render military.ejs page

app.get("/military", function(req, res){
    res.render("military");
});


// Thanks page after user signs up

app.get("/thanks", function(req, res){
    res.render("thanks");
});


// Rendering all the battles

app.get("/WATERLOO", function(req, res){
    res.render("battle-template", {
        battleName: "Waterloo",
        battleDate: "18th June 1815",
        belligerents: "France, Great Britain, Prussia",
        battleCONTEXT1: process.env.WATERLOOCONTEXT1,
        battleCONTEXT2: process.env.WATERLOOCONTEXT2,
        battleCONTEXT3: process.env.WATERLOOCONTEXT3,
        BATTLETEXT1: process.env.WATERLOOBATTLETEXT1,
        BATTLETEXT2: process.env.WATERLOOBATTLETEXT2,
        BATTLETEXT3: process.env.WATERLOOBATTLETEXT3,
        BATTLETEXT4: process.env.WATERLOOBATTLETEXT4,
        BATTLETEXT5: "",
        BATTLETEXT6: "",
        BATTLETEXT7: "",
        imageURL1: process.env.WATERLOOIMAGEURL1,
        caption1: "An artist's impression of the battle",
        imageURL2: process.env.WATERLOOMAP,
        caption2: "The geography of the battle",
    });
});

app.get("/JENA", function(req, res){
    res.render("battle-template", {
        battleName: "Jena",
        battleDate: "14th October 1806",
        belligerents: "France, Prussia",
        battleCONTEXT1: process.env.JENACONTEXT1,
        battleCONTEXT2: process.env.JENACONTEXT2,
        battleCONTEXT3: "",
        BATTLETEXT1: process.env.JENABATTLETEXT1,
        BATTLETEXT2: process.env.JENABATTLETEXT2,
        BATTLETEXT3: process.env.JENABATTLETEXT3,
        BATTLETEXT4: "",
        BATTLETEXT5: "",
        BATTLETEXT6: "",
        BATTLETEXT7: "",
        imageURL1: process.env.JENAIMAGEURL1,
        caption1: "An artist's impression of the battle",
        imageURL2: process.env.JENAMAP1,
        caption2: "The geography of the battle",
    });
});


app.get("/MARENGO", function(req, res){
    res.render("battle-template", {
        battleName: "Marengo",
        battleDate: "14th June 1800",
        belligerents: "France, Austria",
        battleCONTEXT1: process.env.MARENGOCONTEXT1,
        battleCONTEXT2: process.env.MARENGOCONTEXT2,
        battleCONTEXT3: "",
        BATTLETEXT1: process.env.MARENGOBATTLETEXT1,
        BATTLETEXT2: process.env.MARENGOBATTLETEXT2,
        BATTLETEXT3: process.env.MARENGOBATTLETEXT3,
        BATTLETEXT4: "",
        BATTLETEXT5: "",
        BATTLETEXT6: "",
        BATTLETEXT7: "",
        imageURL1: process.env.MARENGOIMAGEURL1,
        caption1: "An artist's impression of the battle",
        imageURL2: process.env.MARENGOMAP,
        caption2: "The geography of the battle",
    });
});

app.get("/AUSTERLITZ", function(req, res){
    res.render("battle-template", {
        battleName: "Austerlitz",
        battleDate: "2 December 1805",
        belligerents: "France, Austria, Russia",
        battleCONTEXT1: process.env.AUSTERLITZCONTEXT1,
        battleCONTEXT2: process.env.AUSTERLITZCONTEXT2,
        battleCONTEXT3: "",
        BATTLETEXT1: process.env.AUSTERLITZBATTLETEXT1,
        BATTLETEXT2: process.env.AUSTERLITZBATTLETEXT2,
        BATTLETEXT3: process.env.AUSTERLITZBATTLETEXT3,
        BATTLETEXT4: "",
        BATTLETEXT5: "",
        BATTLETEXT6: "",
        BATTLETEXT7: "",
        imageURL1: process.env.AUSTERLITZIMAGEURL1,
        caption1: "An artist's impression of the battle",
        imageURL2: process.env.AUSTERLITZMAP,
        caption2: "The geography of the battle",
    });
});


app.get("/FRIEDLAND", function(req, res){
    res.render("battle-template", {
        battleName: "Friedland",
        battleDate: "14th June 1807",
        belligerents: "France, Russia",
        battleCONTEXT1: process.env.FRIEDLANDCONTEXT1,
        battleCONTEXT2: process.env.FRIEDLANDCONTEXT2,
        battleCONTEXT3: process.env.FRIEDLANDCONTEXT3,
        BATTLETEXT1: process.env.FRIEDLANDBATTLETEXT1,
        BATTLETEXT2: process.env.FRIEDLANDBATTLETEXT2,
        BATTLETEXT3: process.env.FRIEDLANDBATTLETEXT3,
        BATTLETEXT4: process.env.FRIEDLANDBATTLETEXT4,
        BATTLETEXT5: process.env.FRIEDLANDBATTLETEXT5,
        BATTLETEXT6: "",
        BATTLETEXT7: "",
        imageURL1: process.env.FRIEDLANDIMAGEURL1,
        caption1: "An artist's impression of the battle",
        imageURL2: process.env.FRIEDLANDMAP,
        caption2: "The geography of the battle",
    });
});

app.get("/LEIPZIG", function(req, res){
    res.render("battle-template", {
        battleName: "Leipzig",
        battleDate: "16th-19th October 1813",
        belligerents: "France and vassals, Russia, Austria, Prussia, Sweden, Mecklenburg, Saxony, Württemberg",
        battleCONTEXT1: process.env.LEIPZIGCONTEXT1,
        battleCONTEXT2: process.env.LEIPZIGCONTEXT2,
        battleCONTEXT3: process.env.LEIPZIGCONTEXT3,
        BATTLETEXT1: process.env.LEIPZIGBATTLETEXT1,
        BATTLETEXT2: process.env.LEIPZIGBATTLETEXT2,
        BATTLETEXT3: process.env.LEIPZIGBATTLETEXT3,
        BATTLETEXT4: process.env.LEIPZIGBATTLETEXT4,
        BATTLETEXT5: process.env.LEIPZIGBATTLETEXT5,
        BATTLETEXT6: process.env.LEIPZIGBATTLETEXT6,
        BATTLETEXT7: process.env.LEIPZIGBATTLETEXT7,
        imageURL1: process.env.LEIPZIGIMAGEURL1,
        caption1: "An artist's impression of the battle",
        imageURL2: process.env.LEIPZIGMAP,
        caption2: "The geography of the battle",
    });
});









/**************************************************************************************************************************************************

                                                    EMAIL POST METH0D

**************************************************************************************************************************************************/

app.post("/emailer", function(req, res) {
    const emailDetails = {
      personEmail: req.body.userEmail,
      personFirstName: req.body.userFirstName,
      personSecondName: req.body.userSecondName,
    };
    const transporter = nodemailer.createTransport({
    host: "smtp.mail.com",
    port: 587,
    auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
    tls: {
    rejectUnauthorized: false
    },
    });
      
    let mailMessage = {
        from: process.env.EMAIL_USERNAME,
        to: emailDetails.personEmail,
        subject: 'Thanks for getting in touch',
        text: 'Hi ' + emailDetails.personFirstName + " " + emailDetails.personSecondName + "! \n\n Thanks for getting in touch! We hope you liked the website, and if you have any suggestions for improvements, or other historical figures you'd like us to research, please don't hesitate to email us. We will keep you notified of the latest developments relating to this website, and any others that we build in the future \n\n All the very best, and have a great day, \n\n The Napoleon Website Team",
      };
      
    transporter.sendMail(mailMessage, function(error, data){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + data.response);
        }
      });

    res.redirect("/thanks");
});



/**************************************************************************************************************************************************

                                                    TEXT TO BE FILLED

**************************************************************************************************************************************************/


//                                                  QUOTES


const napoleonQuotes = [
    "",
    "A picture is worth a thousand words",
    "Impossible is a word only to be found in the dictionary of fools",
    "History is the version of past events that people have decided to agree on",
    "Four hostile newspapers are to be feared more than a thousand bayonets",
    "From the sublime to the ridiculous is but a step",
    "Glory is fleeting, but obscurity is forever",
    "Religion is what keeps the poor from murdering the rich",
    "Ten people who speak make more noise than ten thousand who are silent",
]


// Start the app listening on port 3000
app.listen(process.env.PORT, function(){
    console.log("Listening on port 3000")
});