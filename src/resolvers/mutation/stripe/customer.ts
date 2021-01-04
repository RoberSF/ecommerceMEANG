import { IResolvers } from 'graphql-tools';
import slugify from 'slugify';
import StripeApi from '../../../lib/stripe.api';
import { STRIPE_OBJECTS, STRIPE_ACTIONS } from '../../../lib/stripe.api';


const resolversStripeCustomerMutation: IResolvers = {

// Tipo raíz "Mutation"
  Mutation: {
    
    // genre = name
    async createCustomer(_, { name, email, description }, { db }) {

        return await new StripeApi().execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.CREATE,
          {
          name,
          email,
          description: `${name} (${email} )`           
          })
          .then( (result: object) => {
            return {
                status: true,
                message: `El cliente ${name} se ha creado correctamente`,
                customer: result
            };
          }).catch( (error: Error) => {
            return {
                status: false,
                message: `Error:`.concat(error.message),
                customer: null
            };
          });
    }
  }

}


export default resolversStripeCustomerMutation
