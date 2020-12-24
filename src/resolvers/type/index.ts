import GMR from 'graphql-merge-resolvers';
import resolversPlatformType from './platform';
import resolversProductsType from './product';
import resolversProductsItemsType from './productItem';


const typeResolvers = GMR.merge([
    resolversProductsType,
    resolversPlatformType,
    resolversProductsItemsType
]);

export default typeResolvers