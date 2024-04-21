require('dotenv').config();
const apiKey = process.env.API_KEY;
const apiSecret = process.env.API_SECRET;
const { Vonage } = require('@vonage/server-sdk');
const express = require('express');
const app = express();
const port = 3000
const vonage = new Vonage({
  apiKey: apiKey,
  apiSecret: apiSecret
});
const min = 1000;
const max = 9999;
const randomFourDigitNumber = Math.floor(Math.random() * (max - min + 1)) + min;
const from = "DIMENTIA";
const text = randomFourDigitNumber;
app.use(express.json());
app.post('/send-sms', async(req, res) => {
  try {
    const to = req.body.to;
    // const send_message = await vonage.sms.send({to, from, text});
    return res.status(200).json({message: "Message sent successfully", data: randomFourDigitNumber})
  } catch (error) {
    console.log(error)
    return res.status(400).json({messsage: "Something went wrong!!!"})
  }
 
})
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
