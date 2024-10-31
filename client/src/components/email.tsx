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
