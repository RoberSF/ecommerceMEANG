import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../../config/constants';
import { findElements, findOneElement } from '../../lib/db-functions';


const resolversGenreQuery: IResolvers = {

Query:{

//**************************************************************************************************
//   Método para listar elemtos solamente                                                           
//**************************************************************************************************

   async genres(_, __, { db }) {
        try {
            return {
                status: true,
                message: 'Lista de géneros correctamente cargada',
                genres: await findElements(db, COLLECTIONS.GENRES)
            }
        } catch (error) {
            return {
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