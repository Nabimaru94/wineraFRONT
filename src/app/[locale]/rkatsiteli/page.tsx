import Arrow from '@/components/SVG/arrow'
import React from 'react'

const Rkatsiteli = () => {
	return (
		<div className='mt-32 flex w-[100%] md:mt-24'>
			<div className='relative mx-auto flex w-full max-w-[1200px] items-center bg-[#F1EEE8] px-8 pt-8 text-black xs:pt-14 sm:px-20'>
				<div className='flex max-w-40 flex-1'>
					<div>Rkatsiteli</div>
					<Arrow />
				</div>
				<div className='flex-1'></div>
			</div>
		</div>
	)
}

export default Rkatsiteli
