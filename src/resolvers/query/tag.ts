import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../../config/constants';
import { findElements, findElementsSub, findOneElement } from '../../lib/db-functions';
import { pagination } from '../../lib/pagination';


const resolversTagQuery: IResolvers = {
    Query: {

//**************************************************************************************************
//   Método para listar elemtos solamente                                                           
//**************************************************************************************************

   async tags(_, {page, itemsPage}, { db }) {

    try {
        const paginationData = await pagination(db, COLLECTIONS.TAGS, page, itemsPage, {active: {$ne: true}});
        return {
            info: {
                page: paginationData.page, 
                pages:paginationData.pages, 
                total: paginationData.total,
                itemsPerPage: paginationData.itemsPage
                    },
            status: true,
            message: 'Lista de tags correctamente cargada',
            // genres: await findElements(db, COLLECTIONS.GENRES) // Primer método para lista de genres
            tags: await findElementsSub(db, COLLECTIONS.TAGS, {}, paginationData)
        }
    } catch (error) {
        return {
        info: null,
        status: false,
        message: `Lista de tags no cargada: ${error}`
    }}
},

//**************************************************************************************************
//                 Método para listar un género pasandole un id                                                           
//**************************************************************************************************
 
async tag(_, {id}, {db}) {
    try {
        return {
            status: true,
            message: `Tag ${id} cargado correctamente`,
            tags: await findOneElement(db, COLLECTIONS.TAGS, {id: id}),
        }
    } catch (error) {
        return {
        status: false,
        message: `Tag no cargado: ${error}`
    }}
},
    }
};

export default resolversTagQuery;



