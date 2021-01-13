import { IResolvers } from 'graphql-tools';



const resolversPaypalMutation: IResolvers = {

  Mutation: {
    
    async paypalPay(_, { payment }, { db, paypal }) {

        // Objeto de paypal
          var paymentObject = {
              "intent": "authorize",
              "payer": {
                  "payment_method": "paypal"
              },
              "redirect_urls": {
                  "return_url": "http://127.0.0.1:3000/success",
                  "cancel_url": "http://127.0.0.1:3000/err"
              },
              "transactions": [{
                  "amount": {
                      "total": payment.total,
                      "currency": "EUR"
                  },
                  "description": payment.description 
              }]
          }

          try {

            const pay = await paypal.payment.create(paymentObject).then(
                (result:any) => {
                    // También hay result.n que nos dice el número de elementos que nos devolvió
                    if (result.result.ok === 1) {
                        return {
                            status: true,
                            message: `Se ha pagado correctamente`,
                          };
                    }
                    return {
                        status: false,
                        message: `Error inesperado al insertar pagar. Inténtalo de nuevo por favor.`,
                        tag: null
                    }
 
              })

            //   return new Promise((resolve, reject) => {
            //       paypal.payment.create(paymentObject, function (err, payment) {
            //           if (err) {
            //               reject(err);
            //           }
            //           else {
            //               resolve(payment);
            //           }
            //       });
            //   });
          } catch (error) {
              return {
                  status: false,
                  message: `Error inesperado al pagar. Inténtelo de nuevo.`,
                  tag: null
              }
          }

          
      
      },



  },
};

export default resolversPaypalMutation;


//Objeto que devuelve paypal
// {
//   id: 'PAYID-L76YAZQ671605825V962711C',
//   intent: 'authorize',
//   state: 'created',
//   payer: { payment_method: 'paypal' },
//   transactions: [{  amount: [Object],  description: 'Juego PS5',  related_resources: []   }],
//   create_time: '2021-01-12T10:56:38Z',
//   links: [
//     {
//       href: 'https://api.sandbox.paypal.com/v1/payments/payment/PAYID-L76YAZQ671605825V962711C',
//       rel: 'self',
//       method: 'GET'
//     },
//     {
//       href: 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-2AX79969NF009652H',
//       rel: 'approval_url',
//       method: 'REDIRECT'
//     },
//     {
//       href: 'https://api.sandbox.paypal.com/v1/payments/payment/PAYID-L76YAZQ671605825V962711C/execute',
//       rel: 'execute',
//       method: 'POST'
//     }
//   ],
//   httpStatusCode: 201
// }