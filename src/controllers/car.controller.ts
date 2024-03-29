import { Request, Response } from 'express'
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
import { carModel } from '../models/car/car.model'

interface ProcessEnv {
	[key: string]: string
}

declare const process: {
	env: ProcessEnv
}
class CarController {
	static createCar = async (req: Request, res: Response): Promise<void> => {
		try {
			const authorization = req.headers.authorization
			if (!authorization) {
				res.status(401).send({ error: 'Unauthorized' })
				return
			}

			const token = authorization.split(' ')[1]
			if (!token) {
				res.status(401).send({ error: 'Unauthorized' })
				return
			}
			//	console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY)
			const decodedToken = jwt.verify(
				token,
				process.env.JWT_SECRET_KEY
			) as Jwt & JwtPayload

			const userID = decodedToken.userID as string

			const {
				brand,
				Model,
				desc,
				owner,
				baseAmount,
				bidStartDate,
				bidEndDate,
			} = req.body

			try {
				const startDate = new Date(bidStartDate)
				const endDate = new Date(bidEndDate)

				if (endDate <= startDate) {
					res
						.status(400)
						.json({ error: 'Bid end date must be after bid start date.' })
					return
				}
			} catch (error) {
				console.error(error)
				res.status(500).json({ error: 'Internal Server Error' })
			}

			const carData = new carModel({
				user: userID,
				brand,
				Model,
				desc,
				owner,
				baseAmount,
				bidStartDate,
				bidEndDate,
			})

			const car = new carModel(carData)
			const result = await car.save()
			res.status(201).send(result)
		} catch (error) {
			console.error(error)
			res.status(500).send({ error: 'Internal Server Error' })
		}
	}
	static getAllCars = async (req: Request, res: Response): Promise<void> => {
		try {
			const result = await carModel.find()
			res.send(result)
		} catch (error) {
			console.error(error)
			res.status(500).send({ error: 'Internal Server Error' })
		}
	}

	static getSingleCarById = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const result = await carModel.findById(req.params.id)
			if (!result) {
				res.status(404).send({ message: 'Car not found' })
				return
			}
			res.send(result)
		} catch (error) {
			console.error(error)
			res.status(500).send({ error: 'Internal Server Error' })
		}
	}
	static updateCarById = async (req: Request, res: Response): Promise<void> => {
		try {
			const authorization = req.headers.authorization
			if (!authorization) {
				res.status(401).json({ message: 'Unauthorized user' })
				return
			}

			const token = authorization.split(' ')[1]
			if (!token) {
				res.status(401).json({ message: 'Unauthorized user' })
				return
			}

			const decodedToken = jwt.verify(
				token,
				process.env.JWT_SECRET_KEY
			) as Jwt & JwtPayload
			const userID = decodedToken.userID as string

			const car = await carModel.findById(req.params.id)
			if (!car) {
				res.status(404).json({ message: 'Car not found' })
				return
			}

			if (String(car.user) !== userID) {
				res.status(403).json({ message: 'Unauthorized user' })
				return
			}

			const result = await carModel.findByIdAndUpdate(req.params.id, req.body)
			res.status(200).send(result)
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: 'Internal Server Error' })
		}
	}
	static deleteCarById = async (req: Request, res: Response): Promise<void> => {
		try {
			const authorization = req.headers.authorization
			if (!authorization) {
				res.status(401).json({ message: 'Unauthorized user' })
				return
			}

			const token = authorization.split(' ')[1]
			if (!token) {
				res.status(401).json({ message: 'Unauthorized user' })
				return
			}

			const decodedToken = jwt.verify(
				token,
				process.env.JWT_SECRET_KEY
			) as Jwt & JwtPayload
			const userID = decodedToken.userID as string

			const car = await carModel.findById(req.params.id)
			if (!car) {
				res.status(404).json({ message: 'Car not found' })
				return
			}

			if (String(car.user) !== userID) {
				res.status(403).json({ message: 'Unauthorized user' })
				return
			}

			const result = await carModel.findByIdAndDelete(req.params.id)
			res
				.status(200)
				.json({ success: true, message: 'Car deleted successfully' })
		} catch (error) {
			console.error(error)
			res.status(500).json({ message: 'Internal Server Error' })
		}
	}
	static search = async (req: Request, res: Response): Promise<void> => {
		try {
			const search: string | undefined = req.query.search as string | undefined

			if (!search) {
				res.status(400).json({ error: 'Search parameter is missing' })
				return
			}
			//console.log('Search parameter:', search)

			const cars = await carModel.find({
				$or: [
					{ brand: { $regex: search, $options: 'i' } },
					{ Model: { $regex: search, $options: 'i' } },
				],
			})
			console.log(cars)
			res.json({ cars: cars })
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Internal Server Error' })
		}
	}
	static filterByBaseAmount = async (
		req: Request,
		res: Response
	): Promise<void> => {
		try {
			const minPrice: number = Number(req.query.minPrice)
			const maxPrice: number = Number(req.query.maxPrice)

			if (isNaN(minPrice) || isNaN(maxPrice)) {
				res.status(400).json({ error: 'Invalid minPrice or maxPrice' })
				return
			}
			// console.log('minPrice:', minPrice)
			// console.log('maxPrice:', maxPrice)

			const filteredCars = await carModel.find({
				$or: [
					{ baseAmount: { $gte: minPrice } },
					{ baseAmount: { $lte: maxPrice } },
				],
			})
			console.log(filteredCars)
			res.json({ cars: filteredCars })
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: 'Internal Server Error' })
		}
	}
}

export default CarController
