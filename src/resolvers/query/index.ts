import GMR from 'graphql-merge-resolvers';
import resolversUsersQuery from './user';
import resolversProductsQuery from './product';
import resolversGenreQuery from './genre';

const queryResolvers = GMR.merge([
    resolversUsersQuery,
    resolversProductsQuery,
    resolversGenreQuery
]);

export default queryResolvers