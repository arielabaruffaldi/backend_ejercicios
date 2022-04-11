import fs, { promises as fsPromises } from 'fs';
import moment from 'moment';
import path from 'path';

interface Message {
    mail: string,
    message: string,
    date: string
}

const filePath = path.resolve(__dirname, '../../messages.json');
export default class Messages {
    public async addMessage(message: Message): Promise<Message> {
        console.log("entro aca 2")
        try {
            const messages = await fsPromises.readFile(filePath, 'utf-8');
            const messagesJSON = JSON.parse(messages);
            message.date = moment().format('DD/MM/YYYY h:mm:ss a');
            if (fs.existsSync(filePath)) {
                messagesJSON.push(message);
                await fsPromises.writeFile(
                    filePath,
                    JSON.stringify(messagesJSON, null, '\t')
                );
                return message;
            } else {
                throw new Error('Error while sending the message');
            }
        } catch (e) {
            console.log("erorrrr-", e)
        }
        return message
    }

    public async getMessages(): Promise<Message[]> {
        try {
            const messages = await fsPromises.readFile(filePath, 'utf-8');
            return JSON.parse(messages);
        } catch (e) {
            throw new Error('Error while loading the messages');
        }
    }
}