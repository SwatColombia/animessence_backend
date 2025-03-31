import mongoose from 'mongoose';
import bcrypt from 'bcrypt';



const AnimadorSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    usuario: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nacionalidad:{ type:String, required: true },
    urlPortafolio:{ type: String, required: true },
    token: { type: String, required: false }, // Se recomienda usar JWT
    
    // Se recomienda usar bcrypt para hashear
}, { timestamps: true });

// Antes de guardar el usuario, hasheamos la contraseña
AnimadorSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
});

const Animador = mongoose.model('Animador', AnimadorSchema);
export default Animador;