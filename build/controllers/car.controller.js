"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path");
const car_model_1 = require("../models/car/car.model");
//import { upload } from '../middlewares/multer.middleware'
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination directory for uploaded files
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = (0, path_1.extname)(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        callback(null, filename);
    },
});
exports.upload = (0, multer_1.default)({ storage }).single('images');
class CarController {
}
_a = CarController;
//createCar
CarController.createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }
        const token = authorization.split(' ')[1];
        if (!token) {
            res.status(401).send({ error: 'Unauthorized' });
            return;
        }
        //	console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY)
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        const userID = decodedToken.userID;
        const { brand, Model, desc, owner, baseAmount, bidStartDate, bidEndDate, } = req.body;
        try {
            const startDate = new Date(bidStartDate);
            const endDate = new Date(bidEndDate);
            if (endDate <= startDate) {
                res
                    .status(400)
                    .json({ error: 'Bid end date must be after bid start date.' });
                return;
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        const carData = new car_model_1.carModel({
            user: userID,
            brand,
            Model,
            desc,
            owner,
            images: (_b = req === null || req === void 0 ? void 0 : req.file) === null || _b === void 0 ? void 0 : _b.originalname,
            baseAmount,
            bidStartDate,
            bidEndDate,
        });
        const car = new car_model_1.carModel(carData);
        const result = yield car.save();
        res.status(201).send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
//get All the cars
CarController.getAllCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield car_model_1.carModel.find();
        res.send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
//get Single car by id
CarController.getSingleCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield car_model_1.carModel.findById(req.params.id);
        if (!result) {
            res.status(404).send({ message: 'Car not found' });
            return;
        }
        res.send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
//update car by id
CarController.updateCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(401).json({ message: 'Unauthorized user' });
            return;
        }
        const token = authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Unauthorized user' });
            return;
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        const userID = decodedToken.userID;
        //console.log(userID)
        const car = yield car_model_1.carModel.findById(req.params.id);
        if (!car) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }
        //console.log(String(car.user))
        if (String(car.user) !== userID) {
            res.status(403).json({ message: 'Unauthorized user' });
            return;
        }
        //console.log(req.body)
        const result = yield car_model_1.carModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
// delete car by id
CarController.deleteCarById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            res.status(401).json({ message: 'Unauthorized user' });
            return;
        }
        const token = authorization.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Unauthorized user' });
            return;
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        const userID = decodedToken.userID;
        const car = yield car_model_1.carModel.findById(req.params.id);
        if (!car) {
            res.status(404).json({ message: 'Car not found' });
            return;
        }
        if (String(car.user) !== userID) {
            res.status(403).json({ message: 'Unauthorized user' });
            return;
        }
        const result = yield car_model_1.carModel.findByIdAndDelete(req.params.id);
        res
            .status(200)
            .json({ success: true, message: 'Car deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
//search car by id
CarController.search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const search = req.query.search;
        if (!search) {
            res.status(400).json({ error: 'Search parameter is missing' });
            return;
        }
        //console.log('Search parameter:', search)
        const cars = yield car_model_1.carModel.find({
            $or: [
                { brand: { $regex: search, $options: 'i' } },
                { Model: { $regex: search, $options: 'i' } },
            ],
        });
        console.log(cars);
        res.json({ cars: cars });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//filter cars by baseAmount
CarController.filterByBaseAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const minPrice = Number(req.query.minPrice);
        const maxPrice = Number(req.query.maxPrice);
        if (isNaN(minPrice) && isNaN(maxPrice)) {
            res.status(400).json({ error: 'Invalid minPrice or maxPrice' });
            return;
        }
        const priceCriteria = {};
        if (!isNaN(minPrice)) {
            priceCriteria.$gte = minPrice;
        }
        if (!isNaN(maxPrice)) {
            priceCriteria.$lte = maxPrice;
        }
        const filteredCars = yield car_model_1.carModel.find({
            baseAmount: priceCriteria,
        });
        //console.log(filteredCars)
        res.json({ cars: filteredCars });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = CarController;
