import { Db } from "mongodb";
import { IPaginationOptions } from '../interfaces/pagination-options.interface';
import { pagination } from "./pagination";
import { ACTIVE_VALUES_FILTER } from '../config/constants';

/**
 * Obtener el ID que vamos a utilizar en el nuevo usuario
 * @param database Base de datos con la que estamos trabajando de mongo
 * @param collection  Colección donde queremos buscar el último elemento
 * @param sort  Como queremos ordenarlo { <propiedad>: -1}
 */   
      
      
    //**************************************************************************************************
    //                 Comprobar el último usuario registrado para asignar ID                                                           
    //**************************************************************************************************
    
    export  const asingDocumentId = async (database: Db, collection: string, sort: object = {registerDate: -1}
        ) => {
            const lastElement = await database
            .collection(collection)
            .find()
            .limit(1)
            .sort(sort) // Ordenamos de manera descente
            .toArray(); // Para obtener una lista
          if (lastElement.length === 0) {
            return '1';
          } else {

            // El "+" hace que la operación sea en "número" y despues con String() lo pasamos a texto
            return String(+lastElement[0].id + 1);
          } 
        } 


//**************************************************************************************************
//  Esto sería como lo tendría en el user.ts del mutation                                                           
//**************************************************************************************************

//     const lastUser = await db
//     .collection(COLLECTIONS.USERS)
//     .find()
//     .limit(1)
//     .sort({ registerDate: -1 }) // Ordenamos de manera descente
//     .toArray(); // Para obtener una lista
//   if (lastUser.length === 0) {
//     user.id = 1;
//   } else {
//     user.id = lastUser[0].id + 1;
//   }


//**************************************************************************************************
//                      Encuentra un elemento de la calección de MongoDb                                                           
//**************************************************************************************************

export const findOneElement = async (database: Db, collection: string, filter: object) => {
    return database
    .collection(collection)
    .findOne(filter);
};


//**************************************************************************************************
//                         Con esta inserta uno elemento                                                           
//**************************************************************************************************

export const inserOneElement = async (database: Db, collection: string, document:object) => {
      return await database.collection(collection).insertOne(document)
};



//**************************************************************************************************
//                        Inserta varios elementos/objetos                                                           
//**************************************************************************************************

export const inserManyElements = async (database: Db, collection: string, documents:Array<object>) => {
     return await database.collection(collection).insertMany(documents)
};


//**************************************************************************************************
//                   Lista elementos de una colección                                                                
//**************************************************************************************************

export const findElements = async(database: Db, collection: string, filter:object = {}) => {
   return await database.collection(collection).find(filter).toArray();
}


//**************************************************************************************************
//                   Lista de elementos de una colección con paginación                                                          
//**************************************************************************************************

export const findElementsSub = async(database: Db, collection: string, active:any,paginationOptions: IPaginationOptions = {page: 1, pages: 1, itemsPage: -1, skip: 0, total: -1}) => {

let filter = {};
let filtered: object = {active: {$ne: false}};

  if ( paginationOptions.total === -1){
    return await database.collection(collection).find(filter).toArray();
  }

  
  if(active === ACTIVE_VALUES_FILTER.ALL){
    filtered = {}
  } else if(active === ACTIVE_VALUES_FILTER.INACTIVE ) {
    filtered = {active: {$eq: false}}
  }

  return await database.collection(collection).find(filter)
            .filter(filtered) // relacionado con los registros bloqueados
            .skip(paginationOptions.skip)
            .limit(paginationOptions.itemsPage)
            .sort({id: -1}) // Ordenamos de manera descente
            .toArray();
             // Para obtener una lista
}


//**************************************************************************************************
//                   Actuañizar elemento. Usado en genres                                                           
//**************************************************************************************************

export const updateOne = async(database: Db, collection: string, filter:object = {}, objectUpdated: object = {}) => {
  return await database.collection(collection).updateOne(filter, {$set: objectUpdated});
}


//**************************************************************************************************
//                Actualizar elemento. Usado en users                                                           
//**************************************************************************************************

export const updateFindOne = async(database: Db, collection: string, filter:object = {}, objectUpdated: object = {}) => {
  return await database.collection(collection).findOneAndUpdate(filter, objectUpdated);
}


//**************************************************************************************************
//                      Eliminar un elemento                                                           
//**************************************************************************************************

export const deleteOne = async(database: Db, collection: string, filter:object = {}) => {
  return await database.collection(collection).findOneAndDelete(filter)
}

//**************************************************************************************************
//                   Contar cuantos elementos hay en una colección                                                           
//**************************************************************************************************

export const countlements = async(database: Db, collection: string, filter: object = {}) => {
  return await database.collection(collection).countDocuments(filter);
}

//**************************************************************************************************
//                        Bloquear elemento                                                           
//**************************************************************************************************




