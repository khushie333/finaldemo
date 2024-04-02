import { CustomFilter, Dashboard, SearchBar } from '@/components'
import Image from 'next/image'

export default function Home() {
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
				</div>
				<div className='home__filter-container'>
					<CustomFilter title='Brand' />
					<CustomFilter title='Model' />
				</div>
			</div>
		</main>
	)
}
