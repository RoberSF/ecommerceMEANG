import GMR from 'graphql-merge-resolvers';
import resolversStripeCustomersQuery from './customer';
import resolversStripeCreditCardQuery from './card';


const queryStripeResolvers = GMR.merge([
    resolversStripeCustomersQuery,
    resolversStripeCreditCardQuery
]);

export default queryStripeResolvers