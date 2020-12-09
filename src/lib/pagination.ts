//**************************************************************************************************
//    Sistema de paginación genérica. Posibilidad de usar le método de paginación de angular-avanzado                                                           
//**************************************************************************************************


import { Db } from "mongodb";
import { countlements } from "./db-functions";

export async function pagination(db: Db, collection: string, page:number = 1, itemsPage: number = 20) {
    //Comprobamos el número de items por página

    if (itemsPage < 1 || itemsPage > 20 ) {
        itemsPage = 20;
    }

    if (page <1 ) {
        page = 1
    }

    const total = await countlements(db, collection);
    const pages = Math.ceil(total/ itemsPage);

    return {
        page,
        skip: (page -1) * itemsPage,
        itemsPage,
        total,
        pages
    }
}