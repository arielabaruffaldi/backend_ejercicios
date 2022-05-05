import {knexProducts} from "../db/config"





export default class Products {
    connection
    table    
    constructor(connection, table) {
        this.connection = connection
        this.table = table
    }

    async getAll() {
        return await this.connection.from(this.table).select("*")
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
        await this.connection.from(this.table).insert(product).then((id) => {
            idDb = id
        })
        return idDb
    }

    async deleteById(id) {
        let data = await this.connection.from(this.table).select("*").where("id" , id)
        if (data.length > 0 ) {
            await this.connection.from(this.table).select("*").where("id" , id).del()
            return data
        }
        else {
            throw new Error(`producto con id ${id} no encontrado`)
        }
    }

    async updateProduct(id, body) {
        let data = await this.connection.from(this.table).select("*").where("id" , id)
        if (data.length > 0) {
            let data = await this.connection.from(this.table).select("*").where("id" , id).update(body)
            return data
        }
        else {
            throw new Error(`producto con id ${id} no encontrado`)
        }
    }
    async deleteAll() {
        await this.connection.from(this.table).del()
    }
        
}


export const products = new Products(knexProducts, "allProducts")

