import express from "express";
const router = express.Router();
import { registrar,obtenerAnimadores, login,eliminarUsuario,actualizarUsuario } from '../controllers/animadorController.js';



router.post('/registrar', registrar) ;

router.post('/login', login )

router.get('/usuariosRegistrados', obtenerAnimadores) ;


router.delete('/animadores3D/usuariosRegistrados/:id', eliminarUsuario);

router.put('/animadores3D/usuariosRegistrados/:id', actualizarUsuario);
   


/* router.route('/')
    .get(function(req, res) {
        res.json({ msg: ' hola mundo en express' })
    })
    .post(function(req, res) {
        res.json({ msg: 'Datos emviados' })
    }) */


export default router;
