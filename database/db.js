import mongoose from 'mongoose';

const conectarDB = async () => {
    try {
        const db = await mongoose.connect('mongodb+srv://andresbetancur661:1234@cluster0.hsojtnt.mongodb.net/animessence', {

            useNewUrlParser: true,
            useUnifiedTopology: true,

        })


        const url = `${db.connection.host}:${db.connection.port}`;
        console.log('Base de datos conectada');
        console.log(`Mongo conectado en: ${url}`)


    } catch (error) {
        console.log(error);
        process.exit(1);
    }



}

export default conectarDB;