import { IResolvers } from 'graphql-tools';
import StripeApi from '../../../lib/stripe.api';
import { IStripeCustomer } from '../../../interfaces/stripe/customer.interface';
import { STRIPE_OBJECTS, STRIPE_ACTIONS } from '../../../lib/stripe.api';


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

            return await new StripeApi().execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.LIST,
                {
                    limit, ...pagination
                })
                .then( (result: {has_more: boolean, data: Array<IStripeCustomer>}) => {
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
        },

        async customer(_, {id}, ) {
            return await new StripeApi().execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.RETRIEVE, id)
                .then( async (result: IStripeCustomer) => {
                    return {
                        status: true,
                        message: `El cliente ${result.name} se ha obtenido correctamente`,
                        customer: result
                    }
                }
                ).catch ( (error: Error) => {
                    return {
                        status: true,
                        message: `Error: ${error}`,
                    }
                })
        },

    }

}


export default resolversStripeCustomersQuery;



