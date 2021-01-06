import GMR from 'graphql-merge-resolvers';
import resolversStripeType from './charges';
import resolversPlatformType from './platform';
import resolversProductsType from './product';
import resolversProductsItemsType from './productItem';


const typeResolvers = GMR.merge([
    resolversProductsType,
    resolversPlatformType,
    resolversProductsItemsType,
    resolversStripeType
]);

export default typeResolvers