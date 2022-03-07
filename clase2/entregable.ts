interface Libros {
    nombre: string,
    autor: string
}

class Usuario {
    private nombre: string;
    private apellido: string;
    private libros: Libros[];
    private mascotas: string[];

    constructor(nombre: string, apellido: string, libros: Libros[], mascotas: string[]) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(): string {
        return `${this.nombre} ${this.apellido}`
    }

    getMascotas(): number {
        return this.mascotas.length
    }

    getBooks(): string[] {
        const nombreLibros: string[] = [];
        this.libros.forEach(libro=>nombreLibros.push(libro.nombre))
        return nombreLibros;
    }

    addMascota(mascota: string): void {
        this.mascotas.push(mascota)
    }

    addBook(book: Libros): void {
        this.libros.push(book)
    }
}


const usuario = new Usuario(
    "Juan",
    "Perez",
    [{ nombre: "Libro 1", autor: "Autor 1" }],
    ["gato", "pez"]
)

console.log(usuario.getFullName())

usuario.addMascota('perro')
console.log(usuario.getMascotas())

usuario.addBook({ nombre: "Libro 2", autor: "Autor 2" })
console.log(usuario.getBooks())