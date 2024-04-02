import { CustombuttonProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const Custombutton = ({
	title,
	containerStyles,
	handleClick,
	btnType,
}: CustombuttonProps) => {
	return (
		<button
			disabled={false}
			type={btnType || 'button'}
			className={`custom-btn ${containerStyles}`}
			onClick={handleClick}
		>
			<span className={'flex-1 text-lg'}>
				<h1>{title}</h1>
			</span>
		</button>
	)
}

export default Custombutton
