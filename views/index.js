import pug from "pug"
import path from 'path';
import { fileURLToPath } from 'url';

const road = path.dirname(fileURLToPath(import.meta.url));

const _tbGen = pug.compileFile( road + '/tableGenerator.pug')

export const tbGen = (json) => {
    console.log("generating table based on json:")
    console.log(json)
    return _tbGen(json)
}