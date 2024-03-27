import mongoose, { Schema, Document } from 'mongoose'

// Define interface for user document
interface User extends Document {
	name: string
	email: string
	password: string
	active: boolean // Optional field
}

// Define user schema
const userSchema = new Schema<User>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true, // Ensure unique emails
		validate: {
			validator: (value: string) => {
				// Validate email format
				return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
			},
			message: 'Invalid email',
		},
	},
	password: {
		type: String,
		required: true,
	},
	active: {
		type: Boolean,
		default: false, // Set default value to false
	},
})

// Define and export user model
const UserModel = mongoose.model<User>('User', userSchema)

export default UserModel
