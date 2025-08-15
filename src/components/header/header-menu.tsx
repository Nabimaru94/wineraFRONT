'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from '@/components/ui/navigation-menu'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Link, usePathname, useRouter } from '@/i18n/routing'
import Image from 'next/image'

export function HeaderMenu() {
	const translate = useTranslations('Navigation')
	const scrollToMain = () => {
		window?.scrollTo({ top: 0, behavior: 'smooth' })
	}
	const scrollToAbout = () => {
		const about = document.getElementById('about-page')
		about?.scrollIntoView({ behavior: 'smooth' })
	}
	const scrollToCulture = () => {
		const about = document.getElementById('culture-page')
		about?.scrollIntoView({ behavior: 'smooth' })
	}
	const scrollToContact = () => {
		const about = document.getElementById('contact-page')
		about?.scrollIntoView({ behavior: 'smooth' })
	}
	const router = useRouter()
	const pathname = usePathname()

	return (
		<>
			<div className='absolute left-[7%] flex w-[60px] justify-center sm:w-[70px]'>
				<Link href='/'>
					<Image
						src={'/assets/logo.svg'}
						width={300}
						height={400}
						alt=''
						onClick={() => {
							if (pathname !== '/') {
								router.push('/')
								setTimeout(() => {
									scrollToMain()
								}, 400)
							} else scrollToMain()
						}}
					/>
				</Link>
			</div>
			<NavigationMenu className='ml-auto mr-auto [&>div]:left-[50%] [&>div]:translate-x-[-50%]'>
				<NavigationMenuList className='flex w-[50vw] flex-wrap'>
					<NavigationMenuItem className='flex flex-1 justify-center'>
						<Button
							className='bg-transparent text-sm text-[rgb(220,220,220)] shadow-none outline-none hover:bg-accent hover:text-accent-foreground sm:text-lg'
							onClick={() => {
								if (pathname !== '/') {
									router.push('/')
									setTimeout(() => {
										scrollToMain()
									}, 400)
								} else scrollToMain()
							}}
						>
							{translate('main')}
						</Button>
					</NavigationMenuItem>
					<NavigationMenuItem className='flex flex-1 justify-center'>
						<Button
							className='bg-transparent text-sm text-[rgb(220,220,220)] shadow-none outline-none hover:bg-accent hover:text-accent-foreground sm:text-lg'
							onClick={() => {
								if (pathname !== '/') {
									router.push('/')
									setTimeout(() => {
										scrollToAbout()
									}, 400)
								} else scrollToAbout()
							}}
						>
							{translate('about')}
						</Button>
					</NavigationMenuItem>

					<NavigationMenuItem className='flex flex-1 justify-center'>
						<Button
							className='bg-transparent text-sm text-[rgb(220,220,220)] shadow-none outline-none hover:bg-accent hover:text-accent-foreground sm:text-lg'
							onClick={() => {
								if (pathname !== '/') {
									router.push('/')
									setTimeout(() => {
										scrollToCulture()
									}, 400)
								} else scrollToCulture()
							}}
						>
							{translate('wines')}
						</Button>
					</NavigationMenuItem>
					<NavigationMenuItem className='flex flex-1 justify-center'>
						<Button
							className='bg-transparent text-sm text-[rgb(220,220,220)] shadow-none outline-none hover:bg-accent hover:text-accent-foreground sm:text-lg'
							onClick={() => {
								if (pathname !== '/') {
									router.push('/')
									setTimeout(() => {
										scrollToContact()
									}, 400)
								} else scrollToContact()
							}}
						>
							{translate('contact')}
						</Button>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</>
	)
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							className
						)}
						{...props}
					>
						<div className='text-sm font-medium leading-none'>{title}</div>
						<p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
					</a>
				</NavigationMenuLink>
			</li>
		)
	}
)
ListItem.displayName = 'ListItem'
