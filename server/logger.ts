import fs from 'fs';

const logFile = fs.createWriteStream('logs.txt', { flags: 'a' });

const getCurrentDateTime = (): string => {
  const currentDateTime = new Date().toLocaleString();
  return currentDateTime;
};

const logger = {
  log: (message: string) => {
    const logMessage = `[${getCurrentDateTime()}] LOG: ${message}`;
    console.log(logMessage);
    logFile.write(`${logMessage}\n`);
  },
  error: (message: string) => {
    const errorMessage = `[${getCurrentDateTime()}] ERROR: ${message}`;
    console.error(errorMessage);
    logFile.write(`${errorMessage}\n`);
  },
  info: (message: string) => {
    const infoMessage = `[${getCurrentDateTime()}] INFO: ${message}`;
    console.info(infoMessage);
    logFile.write(`${infoMessage}\n`);
  },
};

export default logger;
