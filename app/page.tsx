// 'use client'
import { CarCard, CustomFilter, Dashboard, SearchBar } from '@/components'
import { headers } from 'next/headers'
import Image from 'next/image'

//import axios from 'axios'

export async function fetchcars() {
	const response = await fetch('http://localhost:5000/api/car', {
		headers: {
			'Cache-Control': 'no-cache',
			Pragma: 'no-cache',
		},
	})
	const result = await response.json()
	console.log(result)
	return result
}

export default async function Home() {
	const allCars = await fetchcars()
	console.log(allCars)
	const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

	return (
		<main className='overflow-hidden'>
			<Dashboard />
			<div className='mt-12 padding-x padding-y max-width' id='discover'>
				<div className='home__text-container'>
					<h1 className='text-4xl font-extrabold'>Cars Catalogue</h1>
					<p>Explore the Cars you might like</p>
				</div>
				<div className='home__filter'>
					<SearchBar />

					<div className='home__filter-container'>
						{/* <CustomFilter title='Brand' />
					<CustomFilter title='Model' /> */}
					</div>
				</div>
				{!isDataEmpty ? (
					<section>
						<div className='home__cars-wrapper'>
							{allCars?.map((car: any) => (
								<CarCard car={car} />
							))}
						</div>
					</section>
				) : (
					<div className=''>
						<h2 className='text-black text-xl font-bold'>oops,no results</h2>
					</div>
				)}
			</div>
		</main>
	)
}
