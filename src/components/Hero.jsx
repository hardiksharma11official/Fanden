import React from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
    return (
        <motion.section 
        initial={{ opacity: 0, y:100, scale:0 }}
        animate={{ opacity: 1, y:0, scale:1 }}
        transition={{ duration: 1 }}
        className='hero relative flex justify-center items-center h-[450px]'>
            <div className='flex justify-center items-center flex-col'>
                <h1 className='font-semibold text-5xl text-white text-center hover:text-[#00A108] transition-all duration-500 ease-in'>
                    Experience the 
                    <br/>
                    Non-Stadia, Stadium Atmosphere!
                </h1>

                <button className='text-2xl bg-[#00A108] text-white rounded-full px-10 py-3 my-10 hover:bg-white hover:text-[#00A108] transition-all duration-500'>Make Reservation</button>
            </div>

        </motion.section>
    )
}

export default Hero
