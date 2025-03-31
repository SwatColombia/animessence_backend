import Animador from '../models/Animador.js';
import bcrypt from 'bcrypt';
    
         const registrar = async (req, res) => {
            const { nombre, usuario, email, password, nacionalidad, urlPortafolio } = req.body;
        
            try {
                // Verificar si el usuario ya está registrado
                const animadorExistente = await Animador.findOne({ email });
                if (animadorExistente) {
                    return res.status(400).json({ msg: 'El usuario ya está registrado' });
                }
        
                // Guardar nuevo usuario
                const animador = new Animador(req.body);
                const animadorGuardado = await animador.save();
        
                // ✅ Solo enviamos una respuesta
                return res.json({ 
                    msg: 'Usuario registrado con éxito', 
                    animador: animadorGuardado 
                });
        
            } catch (error) {
                console.log(error);
                return res.status(400).json({ 
                    msg: 'Hubo un error al registrar el usuario', 
                    error: error.message 
                });
            }
        };
        

const obtenerAnimadores = async (req, res) => {
    try {
        const animadores3D = await Animador.find();
        res.status(200).json(animadores3D);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios.', error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const animador = await Animador.findOne({ email });

        if (!animador) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        
        const passwordCorrecto = await bcrypt.compare(password, animador.password);

            if (!passwordCorrecto) {
                return res.status(400).json({ success: false, message: "Contraseña incorrecta" });
            }

            return res.status(200).json({ success: true, 
                message: "Contraseña correcta",
                id: animador._id.toString(), 
                nombre: animador.nombre,
                email: animador.email,});
               
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Error al iniciar sesión', error: error.message });
    }
};

        const eliminarUsuario = async (req, res) => {
        try {
            const { id } = req.params;
            const usuarioEliminado = await Animador.findByIdAndDelete(id);

            if (!usuarioEliminado) {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }

            res.json({ msg: 'Usuario eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ msg: 'Error al eliminar usuario', error: error.message });
        }
    };
    
    const actualizarUsuario = async (req, res) => {
        try {
            const { id } = req.params;
            const usuarioActualizado = await Animador.findByIdAndUpdate(id, req.body, { new: true });
    
            if (!usuarioActualizado) {
                return res.status(404).json({ msg: 'Usuario no encontrado' });
            }
    
            res.json({ msg: 'Usuario actualizado correctamente', usuario: usuarioActualizado });
        } catch (error) {
            res.status(500).json({ msg: 'Error al actualizar usuario', error: error.message });
        }
    };


export {
    registrar, obtenerAnimadores, login, eliminarUsuario, actualizarUsuario
};