import ChatBot from 'react-simple-chatbot';
import './ChatbotComponent.css';

const ChatbotComponent = () => {
  const steps = [
    {
      id: '1',
      message: 'Welcome to our website! How can I assist you today?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Thank you for your message! Our team will get back to you shortly.',
      end: true,
    },
  ];

  return (
    <ChatBot steps={steps} />
  );
};

export default ChatbotComponent;
