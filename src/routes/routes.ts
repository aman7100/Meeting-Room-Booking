import { Router } from "express"
import { createNewBooking,  createNewUser,} from "../controller/BookController"
import { createNewRoom, getAvailableRoom, getBookedRooms } from "../controller/RoomController"
import {createLogin} from "../controller/LoginController"
import authenticateToken from "../middleware/authMiddleware"
import { validateRequest ,userCreationSchema,roomQuerySchema} from "../middleware/validator"
import  {isAdmin}  from "../middleware/checkAdmin"
import SwaggerDocument from "../util/swagger-document"
import swaggerJSDoc from 'swagger-jsdoc'
const router=Router()
const swaggerUi = require('swagger-ui-express');
const swaggerSpecV1 = swaggerJSDoc(SwaggerDocument);
      router.use("/docs", swaggerUi.serveFiles(swaggerSpecV1));
      router.get("/docs", (req, res) => {
        res.send(swaggerUi.generateHTML(swaggerSpecV1));
      });
router.post('/login',createLogin)
router.post('/get-room',validateRequest('body', roomQuerySchema), getAvailableRoom)
router.post('/new-booking',createNewBooking)
router.post('/new-room',authenticateToken,isAdmin,createNewRoom)
router.post('/new-user',authenticateToken,isAdmin,validateRequest('body', userCreationSchema),createNewUser)
router.get('/getBookedRooms',authenticateToken,isAdmin,getBookedRooms)
export default router