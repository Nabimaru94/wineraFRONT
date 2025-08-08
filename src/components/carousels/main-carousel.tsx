'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import { ArrowLeftIcon, ArrowRightIcon, LucideProps } from 'lucide-react'
import React, { ComponentPropsWithRef, useCallback, useEffect, useState, useMemo, memo } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Link } from '@/i18n/routing'
import Image from 'next/image' // Use modern Image component

// Memoized carousel items to prevent unnecessary re-renders
const CarouselItems = memo(() => {
	const items = useMemo(() => [1, 2, 3, 4], [])

	return (
		<>
			{items.map((el, i) => (
				<CarouselItem key={i} className='relative h-[400px] max-h-[400px] basis-[100%]'>
					<div className='absolute inset-0 w-full items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 will-change-transform'>
						<Image
							src={`/assets/carousel/${i + 1}.jpg`}
							fill
							style={{ objectFit: 'cover' }}
							alt={`Carousel slide ${i + 1}`}
							priority={i === 0} // Prioritize first image
							loading={i === 0 ? 'eager' : 'lazy'} // Lazy load non-first images
							sizes='100vw'
							quality={50} // Reduce quality for better performance
						/>
					</div>
				</CarouselItem>
			))}
		</>
	)
})

CarouselItems.displayName = 'CarouselItems'

// Memoized navigation buttons
const NavigationButton = memo(
	({
		direction,
		onClick,
		Icon,
	}: {
		direction: 'left' | 'right'
		onClick: () => void
		Icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
	}) => (
		<button
			onClick={onClick}
			className={`absolute bottom-[40%] top-[40%] w-[84px] cursor-pointer bg-slate-800/10 opacity-10 transition-opacity duration-200 hover:opacity-100 ${
				direction === 'left' ? 'left-0' : 'right-0'
			}`}
			aria-label={`${direction === 'left' ? 'Previous' : 'Next'} slide`}
		>
			<Icon className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50' />
		</button>
	)
)

NavigationButton.displayName = 'NavigationButton'

// Memoized dot button
const DotButton = memo<ComponentPropsWithRef<'button'> & { isActive: boolean }>(
	({ children, isActive, ...restProps }) => (
		<button
			type='button'
			{...restProps}
			className={cn(
				'h-2 w-2 rounded-full border border-gray-400 bg-gray-300 transition-colors duration-200',
				isActive && 'bg-white'
			)}
			aria-label={`Go to slide ${children}`}
		>
			<Link href={{ pathname: `${children}` }} />
		</button>
	)
)

DotButton.displayName = 'DotButton'

// Custom hook with optimizations
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

	// Combine initialization and selection logic
	const handleApiChange = useCallback((api: CarouselApi) => {
		if (!api) return
		setScrollSnaps(api.scrollSnapList())
		setSelectedIndex(api.selectedScrollSnap())
	}, [])

	useEffect(() => {
		if (!emblaApi) return

		handleApiChange(emblaApi)

		// Use a single event listener instead of multiple
		const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())

		emblaApi.on('select', onSelect)
		emblaApi.on('reInit', () => handleApiChange(emblaApi))

		return () => {
			emblaApi.off('select', onSelect)
			emblaApi.off('reInit', () => handleApiChange(emblaApi))
		}
	}, [emblaApi, handleApiChange])

	return {
		selectedIndex,
		scrollSnaps,
		onDotButtonClick,
	}
}

const MainCarousel = () => {
	const [api, setApi] = useState<CarouselApi>()
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(api)

	// Memoize navigation handlers
	const handlePrev = useCallback(() => api?.scrollPrev(), [api])
	const handleNext = useCallback(() => api?.scrollNext(), [api])

	// Memoize autoplay plugin to prevent recreation
	const autoplayPlugin = useMemo(() => Autoplay({ delay: 8000, stopOnInteraction: false }), [])

	// Memoize carousel options
	const carouselOpts = useMemo(() => ({ loop: true }), [])

	return (
		<div className='relative flex min-w-full flex-1 flex-col items-start'>
			<Carousel opts={carouselOpts} setApi={setApi} plugins={[autoplayPlugin]} className='h-full w-full [&>div]:h-full'>
				<CarouselContent className='h-full'>
					<CarouselItems />
				</CarouselContent>

				<NavigationButton direction='left' onClick={handlePrev} Icon={ArrowLeftIcon} />
				<NavigationButton direction='right' onClick={handleNext} Icon={ArrowRightIcon} />
			</Carousel>

			<div className='absolute bottom-2 flex max-w-fit gap-3 self-center'>
				{scrollSnaps.map((_, index) => (
					<DotButton key={index} onClick={() => onDotButtonClick(index)} isActive={index === selectedIndex}>
						{index + 1}
					</DotButton>
				))}
			</div>
		</div>
	)
}

export default memo(MainCarousel)
