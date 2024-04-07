import express from 'express';
const app = express();
import productsRoutes from './routes/products.routes.js';
import bodyParser from 'body-parser';

//const rutasensayos = require('./view') //para ser más acertiva con la ruta

app.listen(3000, ()=> {
    console.log("servidor iniciado, ejecutandose en http://localhost:3000");
})



// Configurar body-parser para parsear solicitudes JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//configuración rutas
app.use(productsRoutes);

//app.use(express.json()); //recibir en formato json
//app.use(express.urlencoded({extended:false}));





export default app; //exporta el app para ser utilizado desde otro archivo