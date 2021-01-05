export const STRIPE_OBJECTS = {
    CUSTOMERS: 'customers',
    TOKENS: 'tokens'
};

export const STRIPE_ACTIONS = {
    CREATE: 'create',
    LIST: 'list',
    RETRIEVE: 'retrieve',
    UPDATE: 'update',
    DELETE: 'del',
    CREATE_CARD_CLIENT: 'createSource'
}


class StripeApi {
    private stripe = require('stripe')(process.env.STRIPE_API_KEY, {
        apiVersion: process.env.STRIPE_API_VERSION
    });

    // Creamos una función global para consultar la api desde los resolvers
    async execute( object: string, action: string, ...args: [ (string | object), (string | object)?] ) {

        return await this.stripe[object][action](...args);
    }
}

export default StripeApi;