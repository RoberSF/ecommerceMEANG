import { EXPIRETIME, MESSAGES } from './../../config/constants';
import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../../config/constants';
import JWT from '../../lib/jwt';
import bcrypt from 'bcrypt';


const resolversUsersQuery: IResolvers = {



  Query: {

/* ***************************************************************************************/
// _ => información que trae ka búsqueda
// __ => argumentos de la búsqueda
// {db} => Información rollo token etc
//**************************************************************************************** */
    async users(_, __, { db }) { // Users corresponde al "type Query" de squema.graphql
      try {
        return {
/* ***************************************************************************************/
// En el return iría un objeto con toda los datos que pido en la query(abajo). Ojo las llaves. 
//Esto sería graphql 100%

  //return [
    // {
// id: ID!
// name: String!
// lastname: String!
// email: String!
// password: String!
// registerDate: String!
// birthday: String!
// role: Role!
    // }
// ]

//**************************************************************************************** */
          status: true,
          message: 'Lista de usuarios cargada correctamente',
          users: await db.collection(COLLECTIONS.USERS).find().toArray(),
        };
      } catch (error) {
        console.log(error);
        return {
          status: false,
          message:
            'Error al cargar los usuarios. Comprueba que tienes correctamente todo.',
          users: [],
        };
      }
    },





    async login(_, { email, password }, { db }) { // El db es la instancia
      try {
        const user = await db
          .collection(COLLECTIONS.USERS)
          .findOne({ email });

        if (user === null) {
          return {
            status: false,
            message: 'Usuario no existe',
            token: null,
          };
        }
        const passwordCheck = bcrypt.compareSync(password, user.password); // Función para comparar la password de la db y el que me dan

        if (passwordCheck !== null) {
          delete user.password;
          delete user.birthday;
          delete user.registerDate;
        }
        return {
          status: true,
          message: !passwordCheck ? 'Password y usuario no son correctos, sesión no iniciada' : 'Usuario cargado correctamente',
          token: !passwordCheck ? null : new JWT().sign({ user }, EXPIRETIME.H24),
        };
      } catch (error) {
        console.log(error);
        return {
          status: false,
          message: 'Error al cargar el usuario. Comprueba que tienes correctamente todo.',
          token: null,
        };
      }
     },


    me(_, __, { token }) {
      let info = new JWT().verify(token); // Verificamos el valor del token si es válido
      if (info === MESSAGES.TOKEN_VERICATION_FAILED) {
        return {
          status: false,
          message: info,
          user: null
        };
      }
      return {
        status: true,
        message: 'Usuario autenticado correctamente mediante el token',
        user: Object.values(info)[0] // información relacionada con el usuario
      };
    },
    
   },
 };

export default resolversUsersQuery;
