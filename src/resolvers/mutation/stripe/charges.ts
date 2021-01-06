import { IResolvers } from 'graphql-tools';
import { IPayment } from '../../../interfaces/stripe/payment.interface';
import StripeApi, { STRIPE_ACTIONS } from '../../../lib/stripe.api';
import { STRIPE_OBJECTS } from '../../../lib/stripe.api';

const resolversStripeChargeMutation: IResolvers = {

// Tipo raíz "Mutation"
  Mutation: {

    async chargeOrder(_, { payment }) {
      
      // Redondeo de número 
      let paymentRound: IPayment = payment;
      paymentRound.amount = Math.round( (+payment.amount + Number.EPSILON) *100 )/100
      paymentRound.amount *= 100

      // Orden de pago
      return await new StripeApi().execute(STRIPE_OBJECTS.CHARGES, STRIPE_ACTIONS.CREATE,
        paymentRound).then( (result: object) => {
          return {
            status: true,
            message: `El cargo se ha hecho correctamente`,
            charge: result
          };
        }).catch((error: Error) => {
          return {
            status: true,
            message: `Error: ${error}`,
          }
        })



      }
    }
  }


export default resolversStripeChargeMutation