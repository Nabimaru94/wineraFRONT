'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

const Culture = () => {
	const translate = useTranslations('Culture')
	return (
		<div
			className='relative flex min-h-[80vh] flex-col px-4 sm:px-8 md:min-h-screen lg:px-16'
			style={{ backgroundImage: 'linear-gradient(to bottom left, #2a2a2a, #424242)' }}
		>
			{/* Anchor for navigation */}
			<div id='culture-page' className='absolute top-[-8rem] md:top-[-6rem]'></div>

			{/* Saperavi Image - Top Left (more centered and larger) */}
			<div className='absolute left-8 top-[20%] z-0 sm:left-16 md:left-20 lg:left-[10%]'>
				<Image
					className='h-[250px] w-[66px] md:h-[350px] md:w-[93px] lg:h-[405px] lg:w-[108px]'
					src='/assets/bottles/saperavi.png'
					alt=''
					width={500}
					height={500}
				/>
			</div>
			{/* Rkatsiteli Image - Bottom Right (more centered and larger) */}
			<div className='absolute bottom-[10%] right-8 z-0 sm:right-16 md:right-20 lg:right-[10%]'>
				<Image
					className='h-[250px] w-[66px] md:h-[350px] md:w-[93px] lg:h-[405px] lg:w-[108px]'
					src='/assets/bottles/rkatsiteli.png'
					alt=''
					width={500}
					height={500}
				/>
			</div>

			{/* Header - Middle Top */}
			<div className='flex justify-center pt-16 sm:pt-20 md:pt-24'>
				<h1 className='text-center text-xl text-white sm:text-2xl'>{translate('rarityWines')}</h1>
			</div>

			{/* Main Content Area - Center */}
			<div className='flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-8 md:px-16 lg:px-24'>
				<div className='z-10 w-full max-w-lg space-y-8 md:space-y-12 lg:max-w-4xl'>
					{/* First Text Block - Saperavi Description */}
					<div className='text-center'>
						<div className='p-6 sm:p-8 md:px-16 lg:px-28'>
							<p className='absolute left-[120px] right-8 top-[25%] text-justify text-sm leading-relaxed text-gray-200 xs:top-[35%] sm:left-[150px] sm:right-16 sm:text-base md:static md:text-lg'>
								Saperavi is Georgia&apos;s iconic red grape - deep in color, bold in flavor, and naturally full-bodied.
								It bursts with notes of dark berries, plum, and spice, balanced by firm tannins and vibrant acidity. A
								wine of strength and soul, Saperavi is perfect for both aging and memorable moments.
							</p>
						</div>
					</div>
					<div className='invisible h-[1px] w-full px-16 md:visible lg:px-28'>
						<div className='h-full w-full rounded-lg bg-white'></div>
					</div>
					{/* Second Text Block - Rkatsiteli Description */}
					<div className='text-center'>
						<div className='p-6 sm:p-8 md:px-16 lg:px-28'>
							<p className='absolute left-8 right-[120px] top-[60%] text-justify text-sm leading-relaxed text-gray-200 xs:top-[70%] sm:left-16 sm:right-[150px] sm:text-base md:static md:text-lg'>
								Rkatsiteli is Georgia&apos;s iconic white grape - crisp, refined, and beautifully expressive. It offers
								fresh acidity with notes of green apple, pear, and a touch of citrus blossom. Bright and versatile, it
								pairs effortlessly with a wide range of dishes and moods.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Culture
