import fs from 'fs'

const getData = async (file: string) => {
    try {
        const readedFile = await fs.promises.readFile(file, "utf-8");
        if (readedFile.length) return await JSON.parse(readedFile)
        else return readedFile
    } catch (error) {
        console.log("error--", error)
    }
};

export default getData;