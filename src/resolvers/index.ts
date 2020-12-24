/* ***************************************************************************************/
// Fichero que arranca todos los resolvers y que nosotros llamaremos desde schema
//**************************************************************************************** */


import { IResolvers } from 'graphql-tools';
import query from './query';
import mutation from './mutation';
import type from './type';

const resolvers: IResolvers = { // La inteerface de IResolvers ya viene en el paquete de Graphql
  ...query,
  ...mutation,
  ...type
};

export default resolvers;
