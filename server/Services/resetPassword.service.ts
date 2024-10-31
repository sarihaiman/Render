import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { Address } from 'nodemailer/lib/mailer';
const PASS = process.env.PASS

// Create a transporter using Gmail service
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'email.copyright.noreply@gmail.com',
        pass: PASS
    }
});

// Define the Options interface for email configuration
interface Options {
    from: string;
    to: string | Address | (string | Address)[];
    subject: string;
    text: string;
    html: string;
}

export const getUploadFile = async (req: Request, res: Response) => {
    const mail = req.headers.mail as string;
    const contactDetails = "email.copyright.noreply@gmail.com"
    if (!mail) {
        return res.status(400).send('Email parameter is missing');
    }

    const mailOptions: Options = {
        from: 'email.copyright.noreply@gmail.com',
        to: mail,
        subject: 'Test Email',
        text: `${req.headers.reset}`,
        html: `
            <html>
            <head>
                <style>
                    .container {
                        font-family:'Varela Round', sans-serif;
                        background-color:#f4f4f4;
                        padding:5px;
                        text-align:center;
                        align-items:center;
                    }
                    .email-container {
                        margin:80px; 
                        background-color: #ffffff;
                        padding: 20px;
                        margin: 40px auto;
                        width: 80%;
                        max-width: 500px;
                        border: 1px solid #dddddd;
                        text-align:center;
                    }
                    .logo {
                        width: 125px;
                        margin-top: 20px;
                    }
                    .verification-code {
                        background-color: #ffffff;
                        border: 1px solid #dddddd;
                        padding: 10px;
                        margin: 20px 0;
                        display: inline-block;
                        font-size:20px;
                    }
                    .contact-details {
                        margin-top: 10px;
                        font-size: 12px;
                        color: #888888;
                    }
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='email-container'>
                        <h2>בקשתך לאיפוס סיסמה</h2>
                        <p>:קוד האימות שלך הוא</p>
                        <div class='verification-code'>${ req.headers.reset}</div>
                        <div class='contact-details'>${contactDetails} :צור קשר </div>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            return res.send('Email sent successfully');
        }
    });
};
