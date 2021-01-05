import { IResolvers } from 'graphql-tools';
import { IStripeCard } from '../../../interfaces/stripe/card.interface';
import StripeApi from '../../../lib/stripe.api';
import { STRIPE_OBJECTS, STRIPE_ACTIONS } from '../../../lib/stripe.api';


const resolversStripeCreditCardQuery: IResolvers = {

    Query: {

    async card(_, { customer, card }) {

      return await new StripeApi().execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.DETAILS_CARD,
        customer,
        card).then((result: IStripeCard) => {

          return {
            status: true,
            message: `Detalles de tarjeta ${result.id} asignada correctamente`,
            id: result.id,
            card: result
          }
        }).catch((error: Error) => {
          return {
            status: false,
            message: `Error: ${error}`,
          }
        })
    },
        

    }

}

export default resolversStripeCreditCardQuery;



