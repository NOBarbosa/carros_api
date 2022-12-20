import {Router} from "express"
import { registerCar, deleteCar, detailCar, listCars, updateCar } from './controller/cars'

const route = Router()

route.get('/carros', listCars)
route.get('/carros/:id', detailCar)
route.post('/carros', registerCar)
route.put('/carros/:id', updateCar)
route.delete('/carros/:id', deleteCar)



export default route