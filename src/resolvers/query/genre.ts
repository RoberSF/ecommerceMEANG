import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../../config/constants';
import { findElements, findElementsSub, findOneElement } from '../../lib/db-functions';
import { pagination } from '../../lib/pagination';


const resolversGenreQuery: IResolvers = {

Query:{

//**************************************************************************************************
//   Método para listar elemtos solamente                                                           
//**************************************************************************************************

   async genres(_, {page, itemsPage}, { db }) {

        try {
            const paginationData = await pagination(db, COLLECTIONS.GENRES, page, itemsPage, {active: {$ne: false}});
            return {
                info: {
                    page: paginationData.page, 
                    pages:paginationData.pages, 
                    total: paginationData.total,
                    itemsPerPage: paginationData.itemsPage
                        },
                status: true,
                message: 'Lista de géneros correctamente cargada',
                // genres: await findElements(db, COLLECTIONS.GENRES) // Primer método para lista de genres
                genres: await findElementsSub(db, COLLECTIONS.GENRES, {}, paginationData)
            }
        } catch (error) {
            return {
            info: null,
            status: false,
            message: `Lista de géneros no cargada: ${error}`
        }}
    },

//**************************************************************************************************
//                 Método para listar un género pasandole un id                                                           
//**************************************************************************************************
    

    async genre(_, {id}, {db}) {
        try {
            return {
                status: true,
                message: `Género ${id} cargado correctamente`,
                genre: await findOneElement(db, COLLECTIONS.GENRES, {id: id}),
            }
        } catch (error) {
            return {
            status: false,
            message: `Género no cargado: ${error}`
        }}
    },

}
}

export default resolversGenreQuery