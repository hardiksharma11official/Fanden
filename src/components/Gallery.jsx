import React from 'react'
import Panes from './Panes'
import { motion } from 'framer-motion'

const Gallery = () => {

  const panesData = [
    {
      color: 'red',
      icon: 'walking',
      title: 'Imagine',
      subtitle: 'Chase your dreams',
    },
    {
      color: 'yellow',
      icon: 'apple-alt',
      title: 'Build',
      subtitle: 'Realize your vision',
    },
    {
      color: 'green',
      icon: 'tree',
      title: 'Explore',
      subtitle: 'Discover the world',
    },
    {
      color: 'blue',
      icon: 'tint',
      title: 'Adapt',
      subtitle: 'Embrace the times',
    },
    {
      color: 'purple',
      icon: 'palette',
      title: 'Inspire',
      subtitle: 'Share your potential',
    },
    
  ];
  return (
    <section className='flex justify-center items-center flex-col py-20'>
      <motion.div 
      initial={{ opacity: 0, x:-100 }}
      whileInView={{ opacity: 1, x:0 }}
      transition={{ duration: 1 }}
      viewport={{once: true}}
      className='text-center'>
        <h1 className='gallery-heading-title text-white font-archivo font-bold text-9xl leading-9 tracking-tighter text-shadow-multiply'>
            FAN DEN
        </h1>
        <h2 className='text-5xl font-semibold text-gray-600 '>
            Join the {" "}
            <span className='text-[#139000] playfair-font'>
                Revolution
            </span>
        </h2>

        <p className='py-4 text-gray-600'>Embrace the Passion for Sports across India</p>
      </motion.div>

      <motion.div 
      initial={{ opacity: 0, y:-100 }}
      whileInView={{ opacity: 1, y:0 }}
      transition={{ duration: 1 }}
      viewport={{once: true}}
      className='w-full'>
        <Panes panesData={panesData}/>
      </motion.div>
    </section>
  )
}

export default Gallery
