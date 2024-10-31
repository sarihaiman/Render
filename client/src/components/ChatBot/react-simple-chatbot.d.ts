declare module 'react-simple-chatbot' {
    export interface ChatStep {
      id: any;
      message: any;
      trigger: any;
      user?: any;
      end?: any;
    }

    export interface ChatBotProps {
      steps: any;
    }
  
    export default function ChatBot(props: ChatBotProps): JSX.Element;
  }
  