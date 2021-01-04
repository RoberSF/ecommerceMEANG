import { IResolvers } from 'graphql-tools';
import StripeApi from '../../../lib/stripe.api';
import { IStripeCustomer } from '../../../interfaces/stripe/customer.interface';


const resolversStripeCustomersQuery: IResolvers = {
    Query: {

        async customers(_, { limit} ) {

            const stripe = new StripeApi().stripe;
            return await stripe.customers.list(
                {
                limit,
                }
              ).then( (result: {has_more: boolean, data: Array<IStripeCustomer>}) => {
                return {
                    status: true,
                    message: `Lista cargada correctamente`,
                    customers: result.data
                };
              }).catch( (error: Error) => {
                return {
                    status: false,
                    message: `Error:`.concat(error.message),
                    customer: null
                };
              });;
        }
    }

}


export default resolversStripeCustomersQuery;



