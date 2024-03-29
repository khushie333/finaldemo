import express from 'express'
import carRoutes from '../controllers/car.controller'

const router = express.Router()

router.post('/car', carRoutes.createCar)
router.get('/car', carRoutes.getAllCars)
router.get('/car/:id', carRoutes.getSingleCarById)
router.delete('/car/:id', carRoutes.deleteCarById)
router.put('/car/:id', carRoutes.updateCarById)
router.get('/cars', carRoutes.search)
router.get('/carFilter', carRoutes.filterByBaseAmount)
export default router
