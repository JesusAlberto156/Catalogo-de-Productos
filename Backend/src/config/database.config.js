import mongoose from 'mongoose';
import config from './config';

(async () => {
    try {
        const db = await mongoose.connect(config.CONNECTION_STRING, {
            dbName: config.DATABASE
        });
        console.log('Conectado a la Base de Datos: ',db.connection.name);

        return db;
    } catch (error) {
        console.log('Error: ', error);
    }
})();