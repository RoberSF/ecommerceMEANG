import { IResolvers } from 'graphql-tools';
import StripeApi from '../../../lib/stripe.api';
import { IStripeCustomer } from '../../../interfaces/stripe/customer.interface';


const resolversStripeCustomersQuery: IResolvers = {
    Query: {

        async customers(_, { limit, startingAfter, endingBefore} ) {

            let pagination;
            if ( startingAfter !== '' && endingBefore === '') {
                pagination = {
                    starting_after: startingAfter
                } 
            } else if ( startingAfter === '' && endingBefore !== '' ) {
                pagination = {
                    ending_before: endingBefore
                }
                }
                
            const stripe = new StripeApi().stripe;
            return await stripe.customers.list(
                {
                limit, ...pagination
                }
              ).then( (result: {has_more: boolean, data: Array<IStripeCustomer>}) => {
                return {
                    status: true,
                    message: `Lista cargada correctamente`,
                    hasMore: result.has_more,
                    customers: result.data
                };
              }).catch( (error: Error) => {
                return {
                    status: false,
                    message: `Error:`.concat(error.message),
                    hasMore: false,
                    customer: null
                };
              });;
        }
    }

}


export default resolversStripeCustomersQuery;



