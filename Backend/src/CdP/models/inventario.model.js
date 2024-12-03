import * as mongoose from 'mongoose';

const inventarioSchema = new mongoose.Schema({
    
}, { versionKey: false });

export default mongoose.model(
    'cat_inventario',
    inventarioSchema,
    'cat_inventario'
)