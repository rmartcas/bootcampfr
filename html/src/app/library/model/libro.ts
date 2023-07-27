import { Core } from "src/app/@core/common/model/core";
import { Autor } from "./autor";

export class Libro extends Core<Number>{
    titulo:string;
    autor?:Autor;
}