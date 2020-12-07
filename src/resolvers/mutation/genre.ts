import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../../config/constants';
import { inserOneElement, findOneElement, asingDocumentId, updateOne } from '../../lib/db-functions';
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

        console.log(genreObject);

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

        // Comprobar que no existe
        // if (genre){
        //     const genreCheck = await findOneElement(db,COLLECTIONS.GENRES,{name: genre})
            
        //     if (genreCheck !== null) {
        //         return {
        //           status: false,
        //           message: `El género ${genre} está registrado y no puedes registrarlo`,
        //           user: null
        //         };
        //       }
        // } 
    

        // En caso contrario que genere el document para insertarlo
        const filterGenreObjectId = { id: id}
        const objectUpdate = {
            name: genre,
            slug: slugify(genre || '', { lower: true })
        };

        console.log(filterGenreObjectId);
        console.log(objectUpdate);

        try {
            return await updateOne(db,COLLECTIONS.GENRES,filterGenreObjectId, objectUpdate)
            .then(
                result => {
                    // También hay result.n que nos dice el número de elementos que nos devolvió
                    if (result.result.nModified === 1) {
                        return {
                            status: true,
                            message: `El género se actualizó correctamente`,
                            // Object.assign es para mezclar ambos elementos
                            genre: Object.assign({}, filterGenreObjectId, objectUpdate)
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
                message: `Error inesperado al actualizar género. Inténtalo de nuevo por favor.`,
                genre: null
            }
        }
    }

  },


};



export default resolversGenreMutation;
