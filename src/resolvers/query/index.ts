import GMR from 'graphql-merge-resolvers';
import resolversUsersQuery from './user';
import resolversProductsQuery from './product';

const queryResolvers = GMR.merge([
    resolversUsersQuery,
    resolversProductsQuery
]);

export default queryResolvers