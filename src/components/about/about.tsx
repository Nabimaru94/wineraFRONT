import PageBorder from '@/components/SVG/about-ornament'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import React from 'react'

const About = async () => {
	const translate = await getTranslations('About')
	return (
		<div className='about relative flex h-[125vh] flex-col items-center bg-[#F1EEE8] px-8 pt-8 text-black xs:pt-14 sm:h-screen sm:px-20'>
			<div id='about-page' className='absolute top-[-8rem] md:top-[-6rem]'></div>
			<div className='flex max-w-[1200px] flex-col items-center'>
				<PageBorder />
				<h1 className='mt-10 text-xl font-semibold sm:mt-4 sm:text-2xl'>{translate('company')}</h1>
				<p className='mt-8 max-w-[900px] text-justify text-sm leading-relaxed sm:text-base md:text-lg'>
					Winera is a family-owned Georgian winery. Our journey begins in the heart of Kakheti - Napareuli, where our
					winery and production facility are located. Surrounded by 22 hectares of owned vineyards.
				</p>
				<p className='mt-8 max-w-[900px] text-justify text-sm leading-relaxed sm:text-base md:text-lg'>
					At Winera, we combine local knowledge with modern techniques to craft wines that are honest, expressive, and
					full of character. Every step - from hand-harvesting our grapes to bottling at our Napareuli winery - is
					carried out with care and precision, ensuring quality in every bottle.
				</p>
				<Image
					className='mt-10 h-[100px] w-[550px] xs:h-[200px] lg:h-[280px] lg:w-[700px]'
					src={'/assets/pageOrnament1.webp'}
					alt=''
					width={800}
					height={320}
				/>
				<h2 className='mt-8 max-w-[900px] text-justify text-sm leading-relaxed sm:text-base md:text-lg'>
					We believe wine is more than a product—it’s a reflection of place, people, and culture. Winera exists to share
					the soul of Georgian winemaking with the world through wines that are bold, approachable, and memorable.
				</h2>
			</div>
		</div>
	)
}

export default About
