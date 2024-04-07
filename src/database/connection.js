import sql from 'mssql';

const dbSettings = {
    user: "xiomara",
    password: "gix126p",
    server: "XIO",
    database: "webstore",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
}

export const getConnection  = async () => {
    try {
    const pool =  await sql.connect(dbSettings);    
    //traer fecha actual de la bd - comprobar conexión
    //const result = await pool.request().query("SELECT GETDATE()")
    //console.log(result)
    return pool;
    
    }catch (error){
        console.log(error);
    }
}