import { IResolvers } from 'graphql-tools';
import { createNamespaceExportDeclaration } from 'typescript';
import StripeApi, { STRIPE_OBJECTS } from '../../../lib/stripe.api';
import { STRIPE_ACTIONS } from '../../../lib/stripe.api';


const resolversStripeCardMutation: IResolvers = {

// Tipo raíz "Mutation"
  Mutation: {

    async createCardToken(_, {card}) {

        return await new StripeApi().execute(
          STRIPE_OBJECTS.TOKENS,
          STRIPE_ACTIONS.CREATE,
          {
            card: {
              number: card.number,
              exp_month: card.expMonth,
              exp_year: card.expYear,
              cvc: card.cvc,
            },
          }
        ).then ( (result: {id: string}) => {
            return {
                status: true,
                message: `Token ${result.id} creado correctamente`,
                token: result.id
            }
        }).catch ( (error: Error) => {
            return {
                status: false,
                message: `Error: ${error}`,
            }
        })
    },

    async createCardWithClient(_, { customer, tokenCard }) {

      return await new StripeApi().execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.CREATE_CARD_CLIENT,
        customer,
        {
          source: tokenCard
        }).then((result: { id: string }) => {

          return {
            status: true,
            message: `Tarjeta ${result.id} creada correctamente`,
            card: result.id
          }
        }).catch((error: Error) => {
          return {
            status: false,
            message: `Error: ${error}`,
          }
        })
    }


  }

}


export default resolversStripeCardMutation