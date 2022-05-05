import {knexMessages} from "../db/config"

export default class Messages {
    connection
    table    
    constructor(connection, table) {
        this.connection = connection
        this.table = table
    }

    async getMessages() {
        let res= await this.connection.from(this.table).select("*")
        return res
    }

    async addMessage(message) {
        let res = await this.connection.from(this.table).insert(message)
    }
}



export const messages = new Messages(knexMessages, "messages")
