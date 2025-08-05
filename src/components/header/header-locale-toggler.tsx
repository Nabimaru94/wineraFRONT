'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { usePathname, useRouter } from '@/i18n/routing'
import { useLocale, useTranslations } from 'next-intl'

const LocaleToggler = () => {
	const router = useRouter()
	const pathname = usePathname()
	const translations = useTranslations('Navigation')
	const locale = useLocale()
	return (
		<Tabs defaultValue={locale === 'en' ? 'en' : 'ka'} className='invisible mr-auto w-[80px] sm:w-[140px]'>
			<TabsList className='w-full bg-transparent text-sm sm:text-lg'>
				<TabsTrigger
					className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-1 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 data-[state=active]:shadow-none sm:text-lg'
					value='en'
					onClick={() => router.replace(pathname, { locale: 'en' })}
				>
					{translations('en')}
				</TabsTrigger>
				<span className='text-[rgb(220,220,220)]'>/</span>
				<TabsTrigger
					className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-1 py-2 text-sm font-medium transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 data-[state=active]:shadow-none sm:text-lg'
					value='ka'
					onClick={() => router.replace(pathname, { locale: 'ka' })}
				>
					{translations('ka')}
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}

export default LocaleToggler
