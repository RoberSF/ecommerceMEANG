import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../../config/constants';
import { findElements, findOneElement } from '../../lib/db-functions';

const resolversProductsType: IResolvers = {

    Product: {

        productId: (parent) => parent.product_id,
        platformId: (parent) => parent.platform_id,
        product: async (parent,__,{db})  => {
            try {
                const result = await findOneElement(db, COLLECTIONS.PRODUCTS_ITEMS, {id: parent.product_id})
                return result
            } catch(error) {
                return error
            }
        },
        platform: async (parent,__,{db})  => {
            try {
                const result = await findOneElement(db, COLLECTIONS.PLATFORMS, {id: parent.platform_id})
                return result
            } catch(error) {
                return error
            }
        },
        similarProducts: async(parent,__, {db}) => {
            return findElements(
                db, 
                COLLECTIONS.PRODUCTS, 
                { 
                    $and: [ 
                        { product_id: parent.product_id},
                        { id: { $ne: parent.id}}
                     ] 
                })
        }
    
   },
 };

export default resolversProductsType;