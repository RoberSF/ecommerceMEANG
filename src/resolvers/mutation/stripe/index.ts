import GMR from 'graphql-merge-resolvers';
import resolversStripeCardMutation from './card';
import resolversStripeCustomerMutation from './customer';


const stripeResolvers = GMR.merge([
    resolversStripeCustomerMutation,
    resolversStripeCardMutation

]);

export default stripeResolvers