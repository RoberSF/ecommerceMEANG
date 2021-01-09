import GMR from 'graphql-merge-resolvers';
import resolversGenreMutation from './genre';
import resolversTagMutation from './tag';
import resolversUserMutation from './user';
import resolversMailMutation from './email';
import stripeResolvers from './stripe';
import resolversProductMutation from './product';

const mutationResolvers = GMR.merge([
    resolversUserMutation,
    resolversGenreMutation,
    resolversTagMutation,
    resolversMailMutation,
    stripeResolvers,
    resolversProductMutation
]);

export default mutationResolvers