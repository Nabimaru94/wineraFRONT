import About from '@/components/about/about'
import MainCarousel from '@/components/carousels/main-carousel'
import Contact from '@/components/contact/contact'
import Culture from '@/components/culture/culture'

export default function Home() {
	return (
		<div className='mt-32 flex w-[100%] flex-col md:mt-24'>
			<MainCarousel />
			<About />
			<Culture />
			<Contact />
		</div>
	)
}
