'use client'
import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Mock Next.js Image component for demo purposes
const Image = ({ src, alt, className, ...props }) => <img src={src} alt={alt} className={className} {...props} />

const MainCarousel = () => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [isDragging, setIsDragging] = useState(false)
	const [startPos, setStartPos] = useState(0)
	const [currentTranslate, setCurrentTranslate] = useState(0)
	const [prevTranslate, setPrevTranslate] = useState(0)
	const [animationId, setAnimationId] = useState(null)
	const [actualSlide, setActualSlide] = useState(1) // Start at first real slide (index 1)

	const carouselRef = useRef(null)

	// Sample images - replace with your actual images
	const slides = [
		{
			id: 1,
			src: '/assets/carousel/1.jpg',
			alt: 'First Image',
		},
		{
			id: 2,
			src: '/assets/carousel/2.jpg',
			alt: 'Second Image',
		},
		{
			id: 3,
			src: '/assets/carousel/3.jpg',
			alt: 'Third Image',
		},
		{
			id: 4,
			src: '/assets/carousel/4.jpg',
			alt: 'Fourth Image',
		},
	]

	// Create infinite slides array with clones
	const infiniteSlides = [
		slides[slides.length - 1], // Clone of last slide
		...slides, // Original slides
		slides[0], // Clone of first slide
	]

	const goToSlide = (index, immediate = false) => {
		setActualSlide(index)
		const translateValue = -index * 100
		setPrevTranslate(translateValue)
		setCurrentTranslate(translateValue)

		if (carouselRef.current) {
			if (immediate) {
				carouselRef.current.style.transition = 'none'
				carouselRef.current.style.transform = `translateX(${translateValue}%)`
			} else {
				carouselRef.current.style.transition = 'transform 0.3s ease-out'
				carouselRef.current.style.transform = `translateX(${translateValue}%)`
			}
		}
	}

	const nextSlide = () => {
		const newIndex = actualSlide + 1
		setActualSlide(newIndex)
		goToSlide(newIndex)

		// Handle infinite loop
		if (newIndex === infiniteSlides.length - 1) {
			setTimeout(() => {
				setCurrentSlide(0)
				goToSlide(1, true) // Jump to first real slide without animation
			}, 300)
		} else {
			setCurrentSlide(newIndex - 1)
		}
	}

	const prevSlide = () => {
		const newIndex = actualSlide - 1
		setActualSlide(newIndex)
		goToSlide(newIndex)

		// Handle infinite loop
		if (newIndex === 0) {
			setTimeout(() => {
				setCurrentSlide(slides.length - 1)
				goToSlide(infiniteSlides.length - 2, true) // Jump to last real slide without animation
			}, 300)
		} else {
			setCurrentSlide(newIndex - 1)
		}
	}

	const jumpToSlide = (index) => {
		const newIndex = index + 1 // Offset by 1 for clone
		setCurrentSlide(index)
		setActualSlide(newIndex)
		goToSlide(newIndex)
	}

	const getPositionX = (e) => {
		return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX
	}

	const animation = () => {
		if (carouselRef.current) {
			carouselRef.current.style.transform = `translateX(${currentTranslate}%)`
		}
		if (isDragging) {
			const id = requestAnimationFrame(animation)
			setAnimationId(id)
		}
	}

	const dragStart = (e) => {
		// Prevent scrolling on touch devices
		if (e.type === 'touchstart') {
			e.preventDefault()
			setStartPos(getPositionX(e))
		} else {
			e.preventDefault()
			setStartPos(getPositionX(e))
		}
		setIsDragging(true)
		if (carouselRef.current) {
			carouselRef.current.style.transition = 'none'
		}
		if (animationId) {
			cancelAnimationFrame(animationId)
		}
		const id = requestAnimationFrame(animation)
		setAnimationId(id)
	}

	const dragMove = (e) => {
		if (isDragging) {
			e.preventDefault() // Prevent scrolling
			const currentPosition = getPositionX(e)
			const diff = currentPosition - startPos
			const movePercentage = (diff / window.innerWidth) * 100
			setCurrentTranslate(prevTranslate + movePercentage)
		}
	}

	const dragEnd = () => {
		if (!isDragging) return

		setIsDragging(false)
		if (animationId) {
			cancelAnimationFrame(animationId)
		}

		const movedBy = currentTranslate - prevTranslate

		if (carouselRef.current) {
			carouselRef.current.style.transition = 'transform 0.3s ease-out'
		}

		if (movedBy < -25) {
			nextSlide()
		} else if (movedBy > 25) {
			prevSlide()
		} else {
			goToSlide(currentSlide)
		}
	}

	useEffect(() => {
		// Initialize with first real slide
		goToSlide(1, true)

		return () => {
			if (animationId) {
				cancelAnimationFrame(animationId)
			}
		}
	}, [])

	return (
		<div className='relative max-h-[300px] min-h-[300px] w-full touch-none overflow-hidden bg-gray-100 shadow-lg'>
			{/* Main carousel container */}
			<div className='relative h-full overflow-hidden'>
				<div
					ref={carouselRef}
					className='flex h-full cursor-grab transition-transform duration-300 ease-out active:cursor-grabbing'
					style={{ transform: `translateX(${currentTranslate}%)`, touchAction: 'pan-x' }}
					onMouseDown={dragStart}
					onMouseMove={dragMove}
					onMouseUp={dragEnd}
					onMouseLeave={dragEnd}
					onTouchStart={dragStart}
					onTouchMove={dragMove}
					onTouchEnd={dragEnd}
				>
					{infiniteSlides.map((slide, index) => (
						<div key={`${slide.id}-${index}`} className='relative h-full min-w-full'>
							<Image
								src={slide.src}
								alt={slide.alt}
								className='pointer-events-none h-full w-full select-none object-cover'
								draggable={false}
							/>
							<div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
						</div>
					))}
				</div>

				{/* Left arrow */}
				<button
					onClick={prevSlide}
					className='absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-65 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white/90'
					aria-label='Previous slide'
				>
					<ChevronLeft className='h-6 w-6 text-gray-700' />
				</button>

				{/* Right arrow */}
				<button
					onClick={nextSlide}
					className='absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 opacity-65 shadow-lg transition-all duration-200 hover:scale-110 hover:bg-white/90'
					aria-label='Next slide'
				>
					<ChevronRight className='h-6 w-6 text-gray-700' />
				</button>
				<div className='absolute bottom-[0%] left-[50%] flex translate-x-[-50%] items-center justify-center space-x-2 py-2'>
					{slides.map((_, index) => (
						<button
							key={index}
							onClick={() => jumpToSlide(index)}
							className={`h-3 w-3 rounded-full transition-all duration-200 ${
								currentSlide === index ? 'scale-125 bg-white shadow-lg' : 'bg-white/40 hover:bg-white/70'
							}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			</div>

			{/* Dot indicators */}
		</div>
	)
}

export default MainCarousel
