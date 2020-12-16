import GMR from 'graphql-merge-resolvers';
import resolversUsersQuery from './user';
import resolversProductsQuery from './product';
import resolversGenreQuery from './genre';
import resolversTagQuery from './tag';

const queryResolvers = GMR.merge([
    resolversUsersQuery,
    resolversProductsQuery,
    resolversGenreQuery,
    resolversTagQuery,
]);

export default queryResolvers