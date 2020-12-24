import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../../config/constants';
import { inserOneElement, findOneElement, asingDocumentId, updateOne, deleteOne } from '../../lib/db-functions';
import GenresService from '../../services/genre.service';
import slugify from 'slugify';


const resolversGenreMutation: IResolvers = {

// Tipo raíz "Mutation"
  Mutation: {
    
    // genre = name
    async addGenre(_, { genre }, { db }) {


        // En caso de querer usar el servicio
        // new GenresService().helloService();

        // Comprobar que no está en blanco ni es indefinido. Podríamos refactorizar para hacerlo común en un servicio
        if (genre === '' || genre === undefined) {
            return {
                status: false,
                message: `El género no se ha especificado correctamente`,
                genre: null
            }
        };

        // Comprobar que no existe
        if (genre){
            const genreCheck = await findOneElement(db,COLLECTIONS.GENRES,{name: genre})
            
            if (genreCheck !== null) {
                return {
                  status: false,
                  message: `El género ${genre} está registrado y no puedes registrarlo`,
                  user: null
                };
              }
        } 
    

        // En caso contrario que genere el document para insertarlo
        const genreObject = {
            id: await asingDocumentId(db, COLLECTIONS.GENRES, { id: -1}),
            name: genre,
            slug: slugify(genre || '', { lower: true })
        };


        try {
            return await inserOneElement(db,COLLECTIONS.GENRES,genreObject)
            .then(
                result => {
                    // También hay result.n que nos dice el número de elementos que nos devolvió
                    if (result.result.ok === 1) {
                        return {
                            status: true,
                            message: `El género se registró correctamente`,
                            genre: genreObject
                          };
                    }
                    return {
                        status: false,
                        message: `Error inesperado al insertar género. Inténtalo de nuevo por favor.`,
                        genre: null
                    }
 
              })
        } catch(error) {
            return {
                status: false,
                message: `Error inesperado al insertar género. Inténtalo de nuevo por favor.`,
                genre: null
            }
        }
    },

    // genre = id y name
    async updateGenre(_, { id,genre }, { db }) {

        // Comprobar que no está en blanco ni es indefinido. Podríamos refactorizar para hacerlo común en un servicio
        if (String(id) === '' || String(id) === undefined) {
            return {
                status: false,
                message: `El ${id} de género no se ha especificado correctamente`,
                genre: null
            }
        };
        // Comprobar que no está en blanco ni es indefinido. Podríamos refactorizar para hacerlo común en un servicio
        if (genre === '' || genre === undefined) {
            return {
                status: false,
                message: `El nombre no se ha especificado correctamente`,
                genre: null
            }
        };

    
        // En caso contrario que genere el document para insertarlo
        const filterGenreObjectId = { id: id}
        const objectUpdate = {
            name: genre,
            slug: slugify(genre || '', { lower: true })
        };

        try {
            return await updateOne(db,COLLECTIONS.GENRES,filterGenreObjectId, objectUpdate)
            .then(
                result => {
                    // También hay result.n que nos dice el número de elementos que nos devolvió
                    if (result.result.nModified === 1) {
                        return {
                            status: true,
                            message: `El género se actualizó correctamente`,
                          };
                    }
                    return {
                        status: false,
                        message: `Error inesperado al actualizar género. Inténtalo de nuevo por favor.`,
                        genre: null
                    }
 
              })
        } catch(error) {
            return {
                status: false,
                message: `Error inesperado al bloquear género. Inténtalo de nuevo por favor.`,
                genre: null
            }
        }
    },


    async deleteGenre(_, { id }, { db }) {

        if (String(id) === '' || String(id) === undefined) {
            return {
                status: false,
                message: `El ${id} de género no se ha especificado correctamente`,
                genre: null
            }
        };

        try {
            return await deleteOne(db,COLLECTIONS.GENRES,{id: id})
            .then(
                result => {
                    // También hay result.n que nos dice el número de elementos que nos devolvió
                    if (result.ok === 1) {
                        return {
                            status: true,
                            message: `El género con id: ${id} se borró correctamente`,
                          };
                    }
                    return {
                        status: false,
                        message: `Error al borrar género. Inténtalo de nuevo por favor.`,
                        genre: null
                    }
 
              })
        } catch(error) {
            return {
                status: false,
                message: `Error inesperado al borrar género. Inténtalo de nuevo por favor.`,
                genre: null
            }
        }
    },

    async blockGenre(_, { id }, { db }) {

        // Comprobar que no está en blanco ni es indefinido. Podríamos refactorizar para hacerlo común en un servicio
        if (String(id) === '' || String(id) === undefined) {
            return {
                status: false,
                message: `El ${id} de género no se ha especificado correctamente`,
                genre: null
            }
        };

        // En caso contrario que genere el document para insertarlo
        const filterGenreObjectId = { id: id}
        const objectUpdate = {
            active: false
        };

        try {
            return await updateOne(db,COLLECTIONS.GENRES,filterGenreObjectId, objectUpdate)
            .then(
                result => {
                    // También hay result.n que nos dice el número de elementos que nos devolvió
                    if (result.result.nModified === 1) {
                        return {
                            status: true,
                            message: `El género se bloqueó correctamente`,
                            // Object.assign es para mezclar ambos elementos
                            genre: Object.assign({}, filterGenreObjectId, objectUpdate)
                          };
                    }
                    return {
                        status: false,
                        message: `Error inesperado al bloquear género. Inténtalo de nuevo por favor.`,
                        genre: null
                    }
 
              })
        } catch(error) {
            return {
                status: false,
                message: `Error inesperado al bloquear género. Inténtalo de nuevo por favor.`,
                genre: null
            }
        }
    },

    async unBlockGenre(_, { id }, { db }) {

        // Comprobar que no está en blanco ni es indefinido. Podríamos refactorizar para hacerlo común en un servicio
        if (String(id) === '' || String(id) === undefined) {
            return {
                status: false,
                message: `El ${id} de genre no se ha especificado correctamente`,
                genre: null
            }
        };
      
        // En caso contrario que genere el document para insertarlo
        const filterUserObjectId = { id: id}
        const objectUpdate = {
            active: true
        };
      
        try {
            return await updateOne(db,COLLECTIONS.GENRES,filterUserObjectId, objectUpdate)
            .then(
                result => {
                    // También hay result.n que nos dice el número de elementos que nos devolvió
                    if (result.result.nModified === 1) {
                        return {
                            status: true,
                            message: `El género desbloqueado correctamente`,
                            // Object.assign es para mezclar ambos elementos
                            genre: Object.assign({}, filterUserObjectId, objectUpdate)
                          };
                    }
                    return {
                        status: false,
                        message: `Error inesperado al desbloquear género. Inténtalo de nuevo por favor.`,
                        genre: null
                    }
      
              })
        } catch(error) {
            return {
                status: false,
                message: `Error inesperado al desbloquear género. Inténtalo de nuevo por favor.`,
                genre: null
            }
        }
    }
  }

}




export default resolversGenreMutation;
