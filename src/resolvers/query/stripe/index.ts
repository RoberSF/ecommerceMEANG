import GMR from 'graphql-merge-resolvers';
import resolversStripeCustomersQuery from './customer';


const queryStripeCustomerResolvers = GMR.merge([
    resolversStripeCustomersQuery

]);

export default queryStripeCustomerResolvers