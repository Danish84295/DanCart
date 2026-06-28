const nodemailer = require('nodemailer');

const sendEmail = async (to,subject,text)=>{
    try{
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth:{
                user:process.env.Email_USER,
                pass: process.env.Email_PASS
            }
        });
        const mailOptions ={
            from: process.env.Email_USER,
            to,
            subject,
            text
        };
        await transporter.sendMail(mailOptions);
    }
    catch(error){
        console.error('Error Sending email :',error);
    }
};

module.exports =sendEmail;