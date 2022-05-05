import knex from "knex"
import path from "path"

const dbPath = path.resolve(__dirname, '../../mydb.sqlite');


const knexProducts = knex({
    client: "mysql",
    connection: {
        host: "127.0.0.1",
        port: "3306",
        user: "root",
        password: "",
        database: "products"
    },
    pool: { min:0, max:7 } 
})


const knexMessages = knex({
    client: "sqlite3",
    connection: {
        filename: dbPath
    }, 
    useNullAsDefault: true
})






// knexMessages.schema.dropTableIfExists("messages")
//     .finally(()=>{
//         return knexMessages.schema.createTable("messages", table => {
//             table.string("email")
//             table.string("message")
//             table.timestamps(true, true)
//         })
//     })


// knexProducts.schema.dropTableIfExists("allProducts")
//     .finally(()=>{
//         return knexProducts.schema.createTable("allProducts", table => {
//             table.string("name")
//             table.float("price")
//             table.string("thumbnail")
//             table.string("code")
//             table.string("description")
//             table.integer("stock")
//             table.timestamps(true, true)
//             table.increments("id").primary
//         })
//     })



export {knexProducts, knexMessages}