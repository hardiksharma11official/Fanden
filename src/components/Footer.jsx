import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { AiOutlineInstagram } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import { AiOutlineTwitter } from 'react-icons/ai'

const Footer = () => {
    return (
        <footer className='bg-[#0a1801] '>
            <div className='p-20 space-y-20'>
                <div className='flex justify-center items-center'>
                    <div className='footer-items'>
                        Home
                    </div>
                    <div className='footer-items'>
                        About
                    </div>
                    <div className='footer-items'>
                        Shop
                    </div>
                    <div className='footer-items'>
                        Contact
                    </div>
                    <div className='footer-items'><BsSearch /></div>
                </div>

                <div className='flex justify-center items-center space-x-3'>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Your Email Address ...'
                        className='w-[35%] h-10 rounded-full px-2'
                    />
                    <button type="button" className='bg-[#5c9735] text-white h-10 rounded-full px-3 hover:bg-gray-500'>Subscribe</button>
                </div>

                <div className='flex justify-center items-center space-x-10 text-2xl'>
                    <div className='text-gray-300 hover:text-white cursor-pointer'><AiOutlineInstagram /></div>
                    <div className='text-gray-300 hover:text-white cursor-pointer'><BsFacebook /></div>
                    <div className='text-gray-300 hover:text-white cursor-pointer'><AiOutlineTwitter /></div>
                </div>
            </div>
            <div className='h-[0.5px] bg-gray-400 border-0'></div>
            <div className='text-center w-full p-10'>
                <p className='text-sm text-gray-400'>
                    © 2023 Fan Den India. Powered by Fan Den India.
                </p>
            </div>
        </footer>
    )
}

export default Footer
