const sgEmail=require("@sendgrid/mail");
require("dotenv").config();
sgEmail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail=async ({to,from,subject,text,html})=>{
    try {
        await sgEmail.send({
            to,
            from,
            subject,
            text,
            html
        })
        console.log("Email sent successfully.")
    }catch (e){
        console.log("Error occurred while sending email")
    }

}
module.exports=sendEmail;