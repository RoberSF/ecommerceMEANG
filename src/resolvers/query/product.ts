import { IResolvers } from 'graphql-tools';
import { pagination } from '../../lib/pagination';
import { COLLECTIONS } from '../../config/constants';
import { findElements, findElementsOfferStock, findElementsSub, findElementsSubRandom, findElementsSubSearch, findOneElement } from '../../lib/db-functions';

const resolversProductsQuery: IResolvers = {

  Query: {

   async products(_, {page, itemsPerPage, active}, { db }) {
    try {
        const paginationData = await pagination(db, COLLECTIONS.PRODUCTS, page, itemsPerPage);
        return {
            info: {
                page: paginationData.page, 
                pages:paginationData.pages, 
                total: paginationData.total,
                itemsPerPage: paginationData.itemsPage
                    },
            status: true,
            message: 'Lista de productos correctamente cargada',
            // genres: await findElements(db, COLLECTIONS.GENRES) // Primer método para lista de genres
            products: await findElements(db, COLLECTIONS.PRODUCTS, {active: active}, paginationData)
        }
    } catch (error) {
        return {
        info: null,
        status: false,
        message: `Lista de productos no cargada: ${error}`
    }}
   },

   async productsPlatforms(_, { page, itemsPerPage, active, platform}, { db }) {

    // ** platform ahora tendría que se run array de strings
    // console.log(platform);
    try {
        const paginationData = await pagination(db, COLLECTIONS.PRODUCTS, page, itemsPerPage);
        return {
            info: {
                page: paginationData.page, 
                pages:paginationData.pages, 
                total: paginationData.total,
                itemsPerPage: paginationData.itemsPage
                    },
            status: true,
            message: 'Lista de plataformas correctamente cargada',
            // genres: await findElements(db, COLLECTIONS.GENRES) // Primer método para lista de genres
            products: await findElementsSub(db, COLLECTIONS.PRODUCTS, {active: active, platform_id: platform}, paginationData)
        }
    } catch (error) {
        return {
        info: null,
        status: false,
        message: `Lista de plataformas no cargada: ${error}`
    }}
   },

   async productsPlatformsRandom(_, { page, itemsPerPage, active, platform, random}, { db }) {
    try {
        const paginationData = await pagination(db, COLLECTIONS.PRODUCTS, page, itemsPerPage);
        return {
            info: {
                page: paginationData.page, 
                pages:paginationData.pages, 
                total: paginationData.total,
                itemsPerPage: paginationData.itemsPage
                    },
            status: true,
            message: 'Lista de plataformas correctamente cargada',
            // genres: await findElements(db, COLLECTIONS.GENRES) // Primer método para lista de genres
            products: await findElementsSubRandom(db, COLLECTIONS.PRODUCTS, [{active: active}, {platform_id: platform}, {random: random}, {itemsPerPage: itemsPerPage}], paginationData)
        }
    } catch (error) {
        return {
        info: null,
        status: false,
        message: `Lista de plataformas no cargada: ${error}`
    }}
   },

   async productsOffersLast(_, { page, itemsPerPage, active, random, topPrice, lastUnits }, { db }) {

//    console.log('front', page, itemsPerPage, active, random, topPrice, lastUnits);

    try {
        const paginationData = await pagination(db, COLLECTIONS.PRODUCTS, page, itemsPerPage);
        return {
            info: {
                page: paginationData.page, 
                pages:paginationData.pages, 
                total: paginationData.total,
                itemsPerPage: paginationData.itemsPage
                    },
            status: true,
            message: 'Lista de plataformas correctamente cargada',
            // genres: await findElements(db, COLLECTIONS.GENRES) // Primer método para lista de genres
            products: await findElementsOfferStock(db, COLLECTIONS.PRODUCTS, [{active: active}, {random: random}, {topPrice: topPrice}, {lastUnits: lastUnits}, { itemsPerPage: itemsPerPage}], paginationData)
        }
    } catch (error) {
        return {
        info: null,
        status: false,
        message: `Lista de plataformas no cargada: ${error}`
    }}        

   },

    async productDetails(_,{id}, { db }) {
        try {
            return {
                info: { id },
                status: true,
                message: 'Product details correctamente cargados',
                product: await findOneElement(db,  COLLECTIONS.PRODUCTS, {id})
            }
        } catch (error) {
            return {
            info: null,
            status: false,
            message: `Product details no cargados: ${error}`
        }}
    },

    async productsPlatformsSearch(_, { page, itemsPerPage, active, platform, searchValue}, { db }) {

        // ** platform ahora tendría que se run array de strings
        // console.log(platform);
        try {
            return {
                status: true,
                message: 'Lista de juegos correctamente cargada',
                products: await findElementsSubSearch(db, {active: active, platform_id: platform, name: searchValue })
            }
        } catch (error) {
            return {
            info: null,
            status: false,
            message: `Lista de plataformas no cargada: ${error}`
        }}
       },
    
   },
 };

export default resolversProductsQuery;







        // let otherFilters = {};
        // if (lastUnits > 0 && topPrice > 10) {
        //   otherFilters = {
        //     $and: [
        //       {price: {$lte: topPrice}},
        //       {stock: {$lte: topPrice}}
        //     ]
        //   };
        // } else if (lastUnits <= 0 && topPrice > 10) {
        //   otherFilters =  {price: {$lte: topPrice}};
        // } else if (lastUnits > 0 && topPrice <= 10) {
        //   otherFilters =  {stock: {$lte: lastUnits}};
        // }
        // return new ShopProductsService(
        //   _,
        //   {
        //     pagination: { page, itemsPage },
        //   },
        //   context
        // ).items(active, '', random, otherFilters);



