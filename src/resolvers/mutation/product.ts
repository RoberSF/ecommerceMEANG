import { IResolvers } from 'graphql-tools';
import { IStock } from '../../interfaces/stock.interface';
import { updateStock, findOneElement } from '../../lib/db-functions';
import { COLLECTIONS, SUBSCRIPTIONS_EVENT } from '../../config/constants';


const resolversProductMutation: IResolvers = {

  Mutation: {
    
    updateStock(_, {update}, {db, pubsub}) {

        let updateList:Array<IStock> = update;

        
        try {
            updateList.map( async (item:IStock) => {
                const itemsDetails = await findOneElement(db, COLLECTIONS.PRODUCTS, {id: +item.id});
                console.log('itemsDetail',itemsDetails);
                // Comprobación para que el stock no pueda ser menos que cero
                if(item.increment < 0 && ((item.increment + itemsDetails.stock) < 0)) {
                   item.increment = -itemsDetails.stock; // el - es para que se ponga en cero
                 }
                await updateStock(db, COLLECTIONS.PRODUCTS,{ id: +item.id}, {stock: item.increment});
                itemsDetails.stock += item.increment;
                console.log('stock',itemsDetails.stock);
                // Publicamos al socket uno a uno el cambio 
                pubsub.publish(SUBSCRIPTIONS_EVENT.UPDATE_STOCK_PRODUCT, {
                  selectProductStockUpdate: itemsDetails,
                });
            })

            return true
        } catch(e) {
          console.log(e);
            return false
        }
    }

    

    }
  }




export default resolversProductMutation




