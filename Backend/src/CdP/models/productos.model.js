import * as mongoose from 'mongoose';

const productosSchema = new mongoose.Schema({
    
}, { versionKey: false });

export default mongoose.model(
    'cat_productos',
    productosSchema,
    'cat_productos'
)