import { IResolvers } from 'graphql-tools';
import { IPayment } from '../../../interfaces/stripe/payment.interface';

const resolversStripeChargeMutation: IResolvers = {

// Tipo raíz "Mutation"
  Mutation: {

    async chargeOrder(_, { payment }) {
      
      // Redondeo de número 
      let paymentRound: IPayment = payment;
      paymentRound.amount = Math.round( (+payment.amount + Number.EPSILON) *100 )/100
      paymentRound.amount *= 100
    }

  }

}


export default resolversStripeChargeMutation