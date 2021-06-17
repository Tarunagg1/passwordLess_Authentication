require('dotenv').config()

const express = require('express');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
const app = express();
app.use(express.json());
app.use(express.static('public'))

app.get('/',(req,res)=>{
    // return res.json("hello")
    res.sendFile(__dirname + '/public/index.html')
})


app.post('/send-verification',(req,res) => {
    const {number} = req.body;
    client.verify.services(process.env.SERVICE_ID)
             .verifications
             .create({to: '+91'+number, channel: 'sms'})
             .then(verification => {
                return res.status(200).json({verification})
             })
             .catch((err) => {
                return res.status(400).json({err})
             })
})

app.post('/verify-otp',(req,res) => {
    const {number,code} = req.body;
    client.verify.services(process.env.SERVICE_ID)
      .verificationChecks
      .create({to: '+91'+number, code})
      .then(verification_check => res.status(200).json({verification_check}))
      .catch(err => res.status(400).json({err}))
})


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('server listning at port ',PORT);
})

