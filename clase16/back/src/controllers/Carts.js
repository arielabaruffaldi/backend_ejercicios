import {knexProducts} from "../db/config"
import {products} from './Products'




export default class Cart {
    connection
    table    
    constructor(connection, table) {
        this.connection = connection
        this.table = table
    }
    async getAll() {
        let res = await this.connection.from(this.table).select("*")
        return res
    }

    async getById(id) {
        let data = await this.connection.from(this.table).select("*").where("id" , id)
        if (data.length > 0) {
            return data
        }
        else {
            throw new Error(`producto con id ${id} no encontrado`)
        }
    }

    async save(product) {
        let idDb = null
        let data = await this.connection.from(this.table).insert(product).then((id) => {
            idDb = id
        })
        return idDb
    }
}
