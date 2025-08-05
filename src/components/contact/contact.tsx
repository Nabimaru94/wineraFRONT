import Footer from '@/components/footer/footer'
import PageBorder from '@/components/SVG/about-ornament'
import { getTranslations } from 'next-intl/server'
import React from 'react'

const Contact = async () => {
	const translate = await getTranslations('Contact')
	return (
		<div className='relative flex flex-col items-center bg-[#F1EEE8] px-8 pt-8 text-black xs:pt-14 sm:px-20'>
			<div id='contact-page' className='top absolute top-[-8rem] md:top-[-6rem]'></div>
			{/* <PageBorder />
			<h1 className='mt-4 text-2xl'>{translate('news')}</h1>
			<div className='mb-24 mt-8 flex max-w-[1200px] flex-wrap justify-center gap-8'>
				<div className='group flex cursor-pointer flex-col items-center'>
					<div className='flex h-[160px] w-[280px] bg-[url(/assets/news/1.jpg)] bg-[length:100%_100%] bg-center bg-no-repeat transition-all duration-300 group-hover:bg-[length:120%_120%]' />
					<span className='mt-6 flex max-w-[240px] text-center text-sm text-[#707271]'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nisi nisl, ullamcorper sit amet luctus nec,
						suscipit sed ipsum.
					</span>
				</div>
				<div className='group flex cursor-pointer flex-col items-center'>
					<div className='flex h-[160px] w-[280px] bg-[url(/assets/news/2.jpg)] bg-[length:100%_100%] bg-center bg-no-repeat transition-all duration-300 group-hover:bg-[length:120%_120%]' />
					<span className='mt-6 flex max-w-[240px] text-center text-sm text-[#707271]'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nisi nisl, ullamcorper sit amet luctus nec,
						suscipit sed ipsum.
					</span>
				</div>
				<div className='group flex cursor-pointer flex-col items-center'>
					<div className='flex h-[160px] w-[280px] bg-[url(/assets/news/3.jpg)] bg-[length:100%_100%] bg-center bg-no-repeat transition-all duration-300 group-hover:bg-[length:120%_120%]' />
					<span className='mt-6 flex max-w-[240px] text-center text-sm text-[#707271]'>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nisi nisl, ullamcorper sit amet luctus nec,
						suscipit sed ipsum.
					</span>
				</div>
			</div> */}
			<PageBorder />
			<h1 className='mt-4 text-xl sm:text-2xl'>{translate('contact')}</h1>
			<iframe
				className='mt-8 w-full max-w-[1200px]'
				height='300'
				frameBorder='0'
				style={{ border: 0 }}
				loading='lazy'
				allowFullScreen
				referrerPolicy='no-referrer-when-downgrade'
				src='https://www.google.com/maps/embed/v1/place?key=AIzaSyAbFSeSYvwHRy-JMjhbn2fH4HW0X7NfBrw&q=Napareuli,Georgia'
			></iframe>
			<Footer contact />
		</div>
	)
}

export default Contact
