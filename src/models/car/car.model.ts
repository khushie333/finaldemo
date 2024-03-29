import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ICar extends Document {
	user: string
	brand: string
	Model: string
	desc: string
	owner: string
	baseAmount: number
	bidStartDate: Date
	bidEndDate: Date
}

const carSchema: Schema<ICar> = new Schema<ICar>({
	user: {
		type: String,
		required: true,
	},
	brand: {
		type: String,
		required: true,
	},
	Model: {
		// Changed from 'model' to 'carModel'
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	owner: {
		type: String,
		required: true,
	},
	baseAmount: {
		type: Number,
		required: true,
	},
	bidStartDate: {
		type: Date,
		required: true,
	},
	bidEndDate: {
		type: Date,
		required: true,
	},
})

export const carModel: Model<ICar> = mongoose.model<ICar>('car', carSchema)

export default carModel
