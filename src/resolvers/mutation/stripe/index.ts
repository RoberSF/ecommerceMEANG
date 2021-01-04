import GMR from 'graphql-merge-resolvers';
import resolversStripeCustomerMutation from './customer';


const stripeResolvers = GMR.merge([
    resolversStripeCustomerMutation,

]);

export default stripeResolvers