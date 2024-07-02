import mongoose from "mongoose";
import { Schema } from "mongoose";

const usuarioSchema = new Schema({
    nombre:{
        type: String, 
        required: true 
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model('User', usuarioSchema);

//sobreescribir el método toJSON para que no devuelva el password
/* usuarioSchema.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
} */