// Configuración de constantes de configuración pero para el entorno de producción

import environment from './environments'; // Al estar al mismo nivel hacemos ./

if (process.env.NODE_ENV !== 'production') {
  const env = environment;
}

export const SECRET_KEY =
  process.env.SECRET || 'MEANgraphqlRober';

export enum COLLECTIONS {
  USERS = 'users',
  GENRES = 'genres',
  TAGS = 'tags'
}


export enum MESSAGES {
  TOKEN_VERICATION_FAILED = 'token no valido, inicia sesion de nuevo'
}

/**
 * H = Horas
 * M = Minutos
 * D = Días
 */
export enum EXPIRETIME {
  H1 = 60 * 60,
  H24 = 24 * H1,
  M15 = H1 / 4,
  M20 = H1 / 3,
  D3 = H24 * 3
}