import { IResolvers } from 'graphql-tools';
import { IStock } from '../../interfaces/stock.interface';
import { updateStock } from '../../lib/db-functions';
import { COLLECTIONS } from '../../config/constants';


const resolversProductMutation: IResolvers = {

  Mutation: {
    
    updateStock(_, {update}, {db}) {

        let updateList:Array<IStock> = update;

        try {
            updateList.map( async (item:IStock) => {
                console.log(item);
                await updateStock(db, COLLECTIONS.PRODUCTS,{ id: +item.id}, {stock: item.increment})
            })

            return true
        } catch {
            return false
        }
    }

    }
  }




export default resolversProductMutation
