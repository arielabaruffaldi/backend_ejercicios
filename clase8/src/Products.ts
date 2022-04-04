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

class Products {
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
            throw new Error(`producto con id ${id} no encontrado`)
        }
    }

    async getAll(): Promise<Product[]> {
        return await getData(this.file)
    }

    async deleteById(id: number): Promise<string> {
        let data = await getData(this.file)
        if (getItemInArray(data, id)) {
            const newData = data.filter((item: Product) => item.id !== id)
            await setData(this.file, newData)
            return "se elimino correctamente"
        } else {
            throw new Error(`producto con id ${id} no encontrado`)
        }
    }

    async updateProduct(id: number, body: Product): Promise<Product> {
        let data = await getData(this.file)
        const itemInArray = getItemInArray(data, id)
        console.log("item", itemInArray)
        if (itemInArray) {
            if (body.title) itemInArray['title'] = body.title

            if (body.price) itemInArray['price'] = body.price

            if (body.thumbnail) itemInArray['thumbnail'] = body.thumbnail

            console.log("new item", itemInArray)
            const newData = data.filter((item: Product) => item.id !== id)
            await setData(this.file, [...newData, itemInArray])
            return itemInArray
        } else {
            throw new Error(`producto con id ${id} no encontrado`)
        }
    }

    async deleteAll() {
        await setData(this.file, [])
    }
}

export default Products