import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../../config/constants';
import bcrypt from 'bcrypt';
import { asingDocumentId, findOneElement, inserOneElement, updateOne } from '../../lib/db-functions';



const resolversUserMutation: IResolvers = {

  Mutation: {
    
    async register(_, { user }, { db }) {

      if ( user?.password === null || user?.password === undefined || user?.password === 'null'){
        return {
          status: false,
          message: `Deber definir el password correctamente`,
          user: null
        };
      }
      // Comprobar que el usuario no existe
      const userCheck = await findOneElement(db,COLLECTIONS.USERS,{email: user.email});
      
      if (userCheck !== null) {
        return {
          status: false,
          message: `El email ${user.email} está registrado y no puedes registrarte con este email`,
          user: null
        };
      }

      // Comprobar el último usuario registrado para asignar ID
      user.id = await asingDocumentId(db, COLLECTIONS.USERS, { registerDate: -1 });

      // Asignar la fecha en formato ISO en la propiedad registerDate
      user.registerDate = new Date().toISOString();
      
      // Encriptar password
      user.password = bcrypt.hashSync(user.password, 10);

      // Guardar el documento (registro) en la colección
      return await inserOneElement(db,COLLECTIONS.USERS,user)
        .then(async () => {
          return {
            status: true,
            message: `El usuario con el email ${user.email} está registrado correctamente`,
            user
          };
        })
        .catch((err: Error) => {
          console.log(err.message);
          return {
            status: false,
            message: `Error inesperado, prueba de nuevo`,
            user: null
          };
        });
    },



    async updateUser(_, { user }, { db }) {

      // const userCheck = await findOneElement(db,COLLECTIONS.USERS,{email: user.email});
      
      // if (userCheck !== null) {
      //   console.log(userCheck);
      //   return {
      //     status: false,
      //     message: `El usuario no está definido correctamente`,
      //     user: null
      //   };
      // }

  
      // En caso contrario que genere el document para insertarlo
      const filterGenreObjectId = { id: user?.id}
      const objectUpdate = { 
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        birthday: user.birthday,
        role: user.role
       };

      try {
          // return await updateOne(db,COLLECTIONS.USERS,filterGenreObjectId, objectUpdate)
          return await updateOne(db,COLLECTIONS.USERS,filterGenreObjectId, objectUpdate)
          .then(
              result => {
                  // También hay result.n que nos dice el número de elementos que nos devolvió
                  if (result.result.nModified === 1) {
                      return {
                          status: true,
                          message: `El género se actualizó correctamente`,
                          // Object.assign es para mezclar ambos elementos
                          user: objectUpdate
                        };
                  }
                  return {
                      status: false,
                      message: `Error inesperado al actualizar género. Inténtalo de nuevo por favor.`,
                      user: null
                  }

            })
      } catch(error) {
          return {
              status: false,
              message: `Error inesperado al actualizar género. Inténtalo de nuevo por favor.`,
              user: null
          }
      }
  },
  },
};

export default resolversUserMutation;
