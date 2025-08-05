'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import React, { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Link } from '@/i18n/routing'
import Image from 'next/legacy/image'

const MainCarousel = () => {
	const [api, setApi] = useState<CarouselApi>()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [current, setCurrent] = useState(0)
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [count, setCount] = useState(0)
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api)

	useEffect(() => {
		if (!api) {
			return
		}

		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap() + 1)

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [api])
	const handlePrev = () => {
		api?.scrollPrev()
	}
	const handleNext = () => {
		api?.scrollNext()
	}

	return (
		<div className='relative flex min-w-full flex-1 flex-col items-start'>
			<Carousel
				opts={{ loop: true }}
				setApi={setApi}
				plugins={[
					Autoplay({
						delay: 8000,
					}),
				]}
				className='h-full w-full [&>div]:h-full'
			>
				<CarouselContent className='h-full'>
					{[1, 2, 3, 4].map((el, i) => (
						<CarouselItem key={i} className='relative h-[400px] max-h-[400px] basis-[100%]'>
							<div className='absolute bottom-0 left-0 right-0 top-0 w-full items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900'>
								<Image src={`/assets/carousel/${i + 1}.jpg`} layout='fill' objectFit='cover' alt='' />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<div
					onClick={() => handlePrev()}
					className='absolute bottom-0 left-0 top-0 w-[84px] cursor-pointer bg-[var(--button-1-default)] opacity-10 hover:opacity-100'
				>
					<ArrowLeftIcon className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] opacity-50' />
				</div>
				<div
					onClick={() => handleNext()}
					className='absolute bottom-0 right-0 top-0 w-[84px] cursor-pointer bg-[var(--button-1-default)] opacity-10 hover:opacity-100'
				>
					<ArrowRightIcon className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] opacity-50' />
				</div>
			</Carousel>
			<div className='absolute bottom-2 flex max-w-[fit-content] gap-3 self-center'>
				{scrollSnaps.map((_, index) => (
					<DotButton
						key={index}
						onClick={() => onDotButtonClick(index)}
						className={cn(
							'h-2 w-2 rounded-full border border-[var(--text-2-default)] bg-[rgb(190,190,190)]',
							index === selectedIndex && 'bg-white'
						)}
					/>
				))}
			</div>
		</div>
	)
}

export default MainCarousel

const useDotButton = (emblaApi: CarouselApi) => {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

	const onDotButtonClick = useCallback(
		(index: number) => {
			if (!emblaApi) return
			emblaApi.scrollTo(index)
		},
		[emblaApi]
	)

	const onInit = useCallback((emblaApi: CarouselApi) => {
		if (!emblaApi) return
		setScrollSnaps(emblaApi.scrollSnapList())
	}, [])

	const onSelect = useCallback((emblaApi: CarouselApi) => {
		if (!emblaApi) return
		setSelectedIndex(emblaApi.selectedScrollSnap)
	}, [])

	useEffect(() => {
		if (!emblaApi) return

		onInit(emblaApi)
		onSelect(emblaApi)
		emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
	}, [emblaApi, onInit, onSelect])

	return {
		selectedIndex,
		scrollSnaps,
		onDotButtonClick,
	}
}

type PropType = ComponentPropsWithRef<'button'>

const DotButton: React.FC<PropType> = (props) => {
	const { children, ...restProps } = props

	return (
		<button type='button' {...restProps}>
			<Link href={{ pathname: `${children}` }} />
			{children}
		</button>
	)
}
