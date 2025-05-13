import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n' // Adjust if your i18n config is in a different path

const Navbar = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const { token, setToken, userData } = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false)

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-6 border-b border-b-gray-700 px-4 md:px-10 lg:px-20'>
            <img onClick={() => navigate('/')} className='w-42 cursor-pointer' src={assets.logo} alt="" />

            {/* Language Switch Buttons */}
            <div className='flex gap-2 text-xs'>
                <button onClick={() => i18n.changeLanguage('en')} className='px-2 py-1 rounded bg-gray-700 text-white'>EN</button>
                <button onClick={() => i18n.changeLanguage('bn')} className='px-2 py-1 rounded bg-gray-700 text-white'>BN</button>
            </div>

            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'><li className='py-1'>{t('home')}</li></NavLink>
                <NavLink to='/doctors'><li className='py-1'>{t('all_doctors')}</li></NavLink>
                <NavLink to='/about'><li className='py-1'>{t('about')}</li></NavLink>
                <NavLink to='/contact'><li className='py-1'>{t('contact')}</li></NavLink>
                <NavLink to='/medicine-reminder'><li className='py-1'>{t('medicine_reminder')}</li></NavLink>
            </ul>

            <div className='flex items-center gap-4'>
                {token && userData ? (
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        <img className='w-8 rounded-full' src={userData.image} alt="" />
                        <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-white z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-slate-500 rounded flex flex-col gap-4 p-4'>
                                <p onClick={() => navigate('my-profile')} className='hover:text-black cursor-pointer'>{t('profile')}</p>
                                <p onClick={() => navigate('my-appointments')} className='hover:text-black cursor-pointer'>{t('appointments')}</p>
                                <p onClick={logout} className='hover:text-black cursor-pointer'>{t('logout')}</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')} className='bg-slate-600 text-white px-6 py-1 rounded-full font-light hidden md:block'>
                        {t('create_account')}
                    </button>
                )}
                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
            </div>

            {/* Mobile Menu */}
            <div className={` ${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6'>
                    <img className='w-36' src={assets.logo} alt="" />
                    <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
                    <NavLink onClick={() => setShowMenu(false)} to='/'><p>{t('home')}</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p>{t('all_doctors')}</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/about'><p>{t('about')}</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/contact'><p>{t('contact')}</p></NavLink>
                    <NavLink onClick={() => setShowMenu(false)} to='/medicine-reminder'><p>{t('medicine_reminder')}</p></NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Navbar

