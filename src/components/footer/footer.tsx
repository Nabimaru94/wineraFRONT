import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

const Footer = ({ contact }: { contact: boolean }) => {
	return (
		<div className='mb-5 mt-14 flex w-full flex-col gap-4'>
			<div className='h-[2px] w-full rounded-full bg-[#707271]' />
			<div className={cn('flex w-full justify-end', contact && 'justify-between')}>
				{contact && (
					<div className='flex flex-col pr-4 lg:flex-row'>
						<div className='flex flex-col border-b border-[#707271] px-4 md:border-none'>
							<span>Nikoloz Zabakhidze</span>
							<span>+995 595 363 888</span>
							<span>n.zabakhidze@winera.ge</span>
						</div>
						<div className='flex flex-col border-b border-[#707271] px-4 md:border-none'>
							<span>Goga Kholuashvili</span>
							<span>+995 599 977 326</span>
							<span>g.kholuashvili@winera.ge</span>
						</div>
						<span className='flex px-4'>info@winera.ge</span>
					</div>
				)}

				<div className='flex min-w-[60px] flex-auto flex-col items-center justify-center'>
					<Image src={'/assets/logo.svg'} width={60} height={50} alt='' />
					{/* <span className='text-sm text-[#707271]'>Winera</span> */}
				</div>
			</div>
		</div>
	)
}

export default Footer
