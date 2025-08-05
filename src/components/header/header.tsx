import React from 'react'
import { HeaderMenu } from '@/components/header/header-menu'
import LocaleToggler from '@/components/header/header-locale-toggler'

const Header = () => {
	return (
		<div className='header fixed top-0 z-50 flex h-32 w-full items-center bg-headerBackground text-[rgb(220,220,220)] md:h-24'>
			<HeaderMenu />
			<LocaleToggler />
		</div>
	)
}

export default Header
