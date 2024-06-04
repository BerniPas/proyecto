const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//uri de conexion
const URL_MONGO_LOCAL = process.env.MONGO_LOCAL;
const URL_MONGO_ATLAS = process.env.MONGO_ATLAS;

//opciones de conexion
const clientOptions = {
    serverApi: { 
        version: "1", 
        strict: true, 
        deprecationErrors: true 
    },
};

const conexion = async () => {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        await mongoose.connect(URL_MONGO_ATLAS, clientOptions);
        console.log(
            "You successfully connected to MongoDB!"
        );
    } catch (error) {
        console.log("Error: ", error);
    }
}


module.exports = conexion;
