import GMR from 'graphql-merge-resolvers';
import resolversGenreMutation from './genre';
import resolversTagMutation from './tag';
import resolversUserMutation from './user';
import resolversMailMutation from './email';
import stripeResolvers from './stripe';

const mutationResolvers = GMR.merge([
    resolversUserMutation,
    resolversGenreMutation,
    resolversTagMutation,
    resolversMailMutation,
    stripeResolvers
]);

export default mutationResolvers