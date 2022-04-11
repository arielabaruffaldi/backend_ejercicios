import fs, { promises as fsPromises } from 'fs';
import moment from 'moment';
import path from 'path';

interface Product {
    name: string,
    price: number,
    imgUrl: string,
    id: number
}

interface Cart {
   id: number, 
   date: string,
   products: Product[]
}

export default class Cart {
   
}