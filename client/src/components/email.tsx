import { useState } from 'react';
import axios from 'axios';
import { domain } from '../Config';


const EmailForm = () => {
    const [emailData, setEmailData] = useState({
        from: 's97414h@gmail.com',
        to: 's97414h@gmail.com',
        subject: '',
        text: 'bn'
    });

    const sendEmail = () => {
        axios.post(`${domain}/send-email`, emailData)
            .then(() => {
                console.log('Email sent successfully');
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Subject"
                value={emailData.subject}
                onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
            />
            <textarea
                placeholder="Body"
                value={emailData.text}
                onChange={(e) => setEmailData({ ...emailData, text: e.target.value })}
            />
            <button onClick={sendEmail}>Send Email</button>
        </div>
    );
};

export default EmailForm;
