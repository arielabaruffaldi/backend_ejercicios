import getData from './utils/getData'
import setData from './utils/setData'

interface Product {
    title: string
    price: number
    thumbnail: string
    id?: number
}

const getItemInArray = (data: Product[], id: number) => {
    return data.find((item: Product) => item.id === id)
}

class Contenedor {
    private file: string;

    constructor(file: string) {
        this.file = file;
    }

    async save(product: Product): Promise<number> {
        let data = await getData(this.file)
        const id = data.length + 1;
        await setData(this.file, [...data, { ...product, id: id }])
        return id
    }

    async getById(id: number): Promise<Product> {
        let data = await getData(this.file)
        const itemInArray = getItemInArray(data, id)
        if (itemInArray) {
            return itemInArray
        } else {
            throw new Error(`no existe el id ${id}`)
        }

    }

    async getAll(): Promise<Product> {
        return await getData(this.file)
    }

    async deleteById(id: number): Promise<string> {
        let data = await getData(this.file)
        if (getItemInArray(data, id)) {
            const newData = data.filter((item: Product) => item.id !== id)
            await setData(this.file, newData)
            return "se elimino correctamente"
        } else {
            throw new Error(`no existe el id ${id}`)
        }
    }

    async deleteAll() {
        await setData(this.file, [])
    }
}

const contenedor = new Contenedor("./products.txt");

const app = async () => {
    console.log("contenedor.getAll()", await contenedor.getAll())
    
    await contenedor.save({ title: "PlayStation3", price: 200, thumbnail: "https://as.com/meristation/imagenes/2021/06/27/reportajes/1624775678_021044_1624775732_sumario_grande.jpg" })
    await contenedor.save({ title: "Sega", price: 500, thumbnail: "https://as.com/meristation/imagenes/2021/06/27/reportajes/1624775678_021044_1624775732_sumario_grande.jpg" })
    await contenedor.save({ title: "Sega2", price: 500, thumbnail: "https://as.com/meristation/imagenes/2021/06/27/reportajes/1624775678_021044_1624775732_sumario_grande.jpg" })

    console.log(await contenedor.getById(1))
    console.log("contenedor.getAll()", await contenedor.getAll())

    // await contenedor.deleteById(2)
    // await contenedor.deleteAll()
}

app()