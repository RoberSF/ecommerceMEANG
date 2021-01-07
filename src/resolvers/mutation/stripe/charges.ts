import { IResolvers } from 'graphql-tools';
import { IPayment } from '../../../interfaces/stripe/payment.interface';
import StripeApi from '../../../lib/stripe.api';
import { STRIPE_OBJECTS, STRIPE_ACTIONS } from '../../../lib/stripe.api';
import { IStripeCustomer } from '../../../interfaces/stripe/customer.interface';
import { IStripeCard } from '../../../interfaces/stripe/card.interface';

const resolversStripeChargeMutation: IResolvers = {

// Tipo raíz "Mutation"
  Mutation: {

    async chargeOrder(_, { payment }) {

      // Comprobar que existe el cliente
      let payment_customer: IPayment = payment.customer;
      const userData:IStripeCustomer = await new StripeApi().execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.RETRIEVE,  payment_customer )
      if ( userData) {

        // console.log('1.-payment.token',payment.token );

        if ( payment.token !== undefined && payment.token !== ''  ) {
          // console.log('2.-token existe');
          // Asociar el cliente a la tarjeta
          const cardCreate: IStripeCard = await new StripeApi().execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.CREATE_CARD_CLIENT,
            payment.customer, { source: payment.token
             } )
          // console.log('3.-cardCreate',cardCreate);
          // console.log('4.-',cardCreate.id);

          // Actualizar como fuente predeterminada de pago
          // console.log('5.-', payment.customer, cardCreate.id );
          const upDatePayMethod =  await new StripeApi().execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.UPDATE,
            payment.customer,
            {
              default_source: cardCreate.id
            })
          // console.log('6.-', upDatePayMethod );

          // Actualizar borrando las demás tarjetas de ese cliente
          // Lo hacemos por que la Api de Stripe pone la que estoy usando como predeterminada 
          //     y la que está la deja de lado, aun que sea la misma

          const ListCardCustomer =  await new StripeApi().execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.LIST_CARDS, payment.customer, {object: 'card', limit: 5})
          // console.log('7.-', ListCardCustomer.data );
          const list = ListCardCustomer.data?.map(async(item: IStripeCard) => {
            // id de la tarjeta que no queremos borrar
            let noDeleteCard = cardCreate.id
            if( item.id !== noDeleteCard && noDeleteCard !== '') {
              // console.log('8.- No Borrar', noDeleteCard);
              // console.log('9.- Borrada', item.id);
              const removeOtherCards = await new StripeApi().execute(STRIPE_OBJECTS.CUSTOMERS, STRIPE_ACTIONS.DELETE_CARD, payment.customer, item.id)
            }
          })

        } else if (payment.token === undefined && userData.default_source === null ) {
          return {
            status: false,
            message: 'Cliente no tiene ningun método de pago asignado y no puede realizar pago'
          }
        }
      } else {
        // No funciona el else, da el error Stripe antes de que llegue aquí
        return {
          status: false,
          message: 'Cliente no encontrado'
        }
      }
      
      delete payment.token; // al pasarle el objeto entero de payment llevaría el token y para éste método no sería necesario

      // Redondeo de número 
      let paymentRound: IPayment = payment;
      paymentRound.amount = Math.round( (+payment.amount + Number.EPSILON) *100 )/100
      paymentRound.amount *= 100

      // Orden de pago
      return await new StripeApi().execute(STRIPE_OBJECTS.CHARGES, STRIPE_ACTIONS.CREATE,
        paymentRound).then( (result: object) => {
          // console.log('10.-', result);
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