import { IResolvers } from 'graphql-tools';


const resolversPlatformType: IResolvers = {

    Platform: {
    
        // Como ninguno tiene active lo que hacemos es ponerle active = true a todos
        active: (parent) => (parent.active !== false) ? true : false
    
   },
 };

export default resolversPlatformType;