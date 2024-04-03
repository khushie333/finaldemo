import exp from 'constants'
import { MouseEventHandler } from 'react'

export interface CustombuttonProps {
	title: string
	containerStyles?: string
	textStyles?: string
	rightIcon?: string
	handleClick?: MouseEventHandler<HTMLButtonElement>
	btnType?: 'button' | 'submit'
}
export interface SearchBrandProps {
	brand: String
	setBrand: (brand: string) => void
}
export interface CarProps {
	_id: string
	user: string
	brand: string
	Model: string
	desc: string
	owner: string
	images: [String]
	baseAmount: number
	bidStartDate: Date
	bidEndDate: Date
}
export interface Car {
	_id: string
	user: string
	brand: string
	Model: string
	desc: string
	owner: string
	images: [String]
	baseAmount: number
	bidStartDate: Date
	bidEndDate: Date
}
export interface filterProps {
	brand: string
	Model: string
}
