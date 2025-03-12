import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('❌ MONGODB_URI no está definido en el archivo .env');
}

// Objeto global para evitar múltiples conexiones en desarrollo
let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) {
    console.log('✅ Usando conexión existente a MongoDB');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('🔄 Conectando a MongoDB...');
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: 'ingenieria_menu', // OPCIONAL: especifica el nombre de la DB si es necesario
        bufferCommands: false,
      })
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ Conectado a MongoDB');
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.error('❌ Error conectando a MongoDB:', error);
    throw error;
  }
}

// Guardamos la conexión en `global` solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
  (global as any).mongoose = cached;
}
