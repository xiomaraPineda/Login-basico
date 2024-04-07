import { Router } from "express";
const router = Router();
import {vistaLogin, formulario, vistaInicio} from '../controllers/products.controllers.js'



router.get("/", vistaLogin);
router.post("/validar",formulario);
router.get("/inicio", vistaInicio);


export default router;