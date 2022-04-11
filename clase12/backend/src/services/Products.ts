interface Product {
    name: string,
    price: number,
    imgUrl: string,
    id: number
}

export class Products {
    private products: Product[]

    constructor(products: Product[]) {
        this.products = products;
    }

    public getProducts(): Product[] {
        return this.products
    }

    public getProductById(id: number): Product | undefined {
        const product = this.products.find(product => product.id == id)
        if (product) {
            return product
        }
    }

    public addProduct(data: Product): void {
        console.log("entro aca")
        this.products.push({
            name: data.name,
            price: data.price,
            imgUrl: data.imgUrl,
            id: this.products.length + 1
        })
    }

    public updateProduct(id, body): Product | undefined {
        const product = this.products.find(product => product.id == id);
        if (body.name && product) {
            product.name = body.name
        }
        if (body.price && product) {
            product.price = body.price
        }
        return product;
    }

    public deleteProduct(id: number): void {
        this.products = this.products.filter(item => item.id !== id)
    }
}


export default Products;