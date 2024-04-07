import { error } from 'console';
import {getConnection} from '../database/connection.js';
import sql from 'mssql';
import path from 'path';
import { fileURLToPath } from 'url';

//definir ruta del directorio debido a la utilización de módulos ECMAScript
const rutaHTMLindex = path.join(path.dirname(fileURLToPath(import.meta.url)), '../', 'view');

//const rutasensayos = require() //para ser más acertiva con la ruta

export async function vistaLogin(req,res) {
    res.sendFile(path.resolve(rutaHTMLindex,'index.html'));
};


export async function formulario(req,res) {
    try{
    let ced = req.body.ced;
    let nombre = req.body.nom;
    let apellido = req.body.apell;
    let correo = req.body.correo;
    let contra = req.body.contra;

        const pool = await getConnection();


        //consulta para verificar si la cédula ya está registrada
        const consultaCedula = await pool
            .request()
            .input('cedula', sql.Int, ced)
            .query("SELECT * FROM loginCrud2 WHERE cedula = @cedula");

        // Si ya existe un usuario con esa cédula, muestra un mensaje de error y no procedas con la inserción
        if (consultaCedula.recordset.length > 0) {
            console.log("La cédula ya está registrada");
            //enviar una respuesta de error al cliente
            return res.status(400).send("La cédula ya está registrada, no se puede volver a registrar");
        }

        const result = await  pool
        .request()
        .input('cedula', sql.Int, ced)
        .input('nombre', sql.VarChar, nombre)
        .input('apellido', sql.VarChar, apellido)
        .input('correo', sql.VarChar, correo)
        .input('contrasena', sql.VarChar, contra)
        .query("INSERT INTO loginCrud2 (cedula,nombre,apellido,correo,contrasena) VALUES (@cedula, @nombre, @apellido, @correo, @contrasena)");

        console.log("datos almacenados correctamente")
        console.log(result)
        res.redirect('/inicio')
      

    }catch(error) {
        console.log(error)
    }
    
};

export async function vistaInicio (req, res){
    res.sendFile(path.resolve(rutaHTMLindex,'inicio.html'));
};

