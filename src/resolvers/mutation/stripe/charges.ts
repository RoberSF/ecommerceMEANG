import { IResolvers } from 'graphql-tools';

const resolversStripeChargeMutation: IResolvers = {

// Tipo raíz "Mutation"
  Mutation: {

    async chargeOrder(_, { payment }) {

    }

  }

}


export default resolversStripeChargeMutation