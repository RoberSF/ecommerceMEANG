import GMR from 'graphql-merge-resolvers';
import resolversUsersQuery from './user';
import resolversProductsQuery from './product';
import resolversGenreQuery from './genre';
import resolversTagQuery from './tag';
import queryStripeResolvers from './stripe';
import resolversDashboardQuery from './dashboard';

const queryResolvers = GMR.merge([
    resolversUsersQuery,
    resolversProductsQuery,
    resolversGenreQuery,
    resolversTagQuery,
    queryStripeResolvers,
    resolversDashboardQuery
]);

export default queryResolvers