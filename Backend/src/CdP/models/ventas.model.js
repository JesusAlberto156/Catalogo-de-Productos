import * as mongoose from 'mongoose';

const ventasSchema = new mongoose.Schema({
    
}, { versionKey: false });

export default mongoose.model(
    'cat_ventas',
    ventasSchema,
    'cat_ventas'
)