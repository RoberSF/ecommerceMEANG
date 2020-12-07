import { Db } from "mongodb";

/**
 * Obtener el ID que vamos a utilizar en el nuevo usuario
 * @param database Base de datos con la que estamos trabajando de mongo
 * @param collection  Colección donde queremos buscar el último elemento
 * @param sort  Como queremos ordenarlo { <propiedad>: -1}
 */   
      
      
      // Comprobar el último usuario registrado para asignar ID
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


export const findOneElement = async (database: Db, collection: string, filter: object) => {
    return database
    .collection(collection)
    .findOne(filter);
};


// Con esta inserta uno elemento
export const inserOneElement = async (database: Db, collection: string, document:object) => {
      return await database
        .collection(collection)
        .insertOne(document)
};

// Con esta inserta varios elementos/objetos
export const inserManyElements = async (database: Db, collection: string, documents:Array<object>) => {
     return await database
        .collection(collection)
        .insertMany(documents)
};

export const findElements = async(database: Db, collection: string, filter:object = {}) => {
   return await database.collection(collection).find(filter).toArray();
}

export const updateOne = async(database: Db, collection: string, filter:object = {}, objectUpdated: object = {}) => {
  return await database.collection(collection).updateOne(filter, {$set: objectUpdated});
}