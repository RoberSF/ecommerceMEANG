import GMR from 'graphql-merge-resolvers';
import resolversUsersQuery from './user';
import resolversProductsQuery from './product';
import resolversGenreQuery from './genre';
import resolversTagQuery from './tag';
import resolversStripeCustomersQuery from './stripe/customer';

const queryResolvers = GMR.merge([
    resolversUsersQuery,
    resolversProductsQuery,
    resolversGenreQuery,
    resolversTagQuery,
    resolversStripeCustomersQuery
]);

export default queryResolvers