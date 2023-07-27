import React from 'react'
import Carousel from './Carousel'
import { motion } from 'framer-motion'

const Review = () => {
    return (
        <section className='flex justify-center items-center flex-col h-screen'>
            <motion.h3 
            initial={{ opacity: 0, x:-100 }}
            whileInView={{ opacity: 1, x:0 }}
            transition={{ duration: 1 }}
            viewport={{once: true}}
            className='text-5xl font-semibold'>Fans at the Den</motion.h3>

            <motion.div 
            initial={{ opacity: 0, x:100 }}
            whileInView={{ opacity: 1, x:0 }}
            transition={{ duration: 1 }}
            viewport={{once: true}}
            className='min-w-[455px] w-[50%] h-full'>
                <Carousel />
            </motion.div>
        </section>
    )
}

export default Review
