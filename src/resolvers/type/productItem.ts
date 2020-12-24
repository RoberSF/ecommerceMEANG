import { IResolvers } from 'graphql-tools';

const resolversProductsItemsType: IResolvers = {

    ProductItem: {

        screenshoot: (parent) => parent.shortScreenshots,
    
   },
 };

export default resolversProductsItemsType;