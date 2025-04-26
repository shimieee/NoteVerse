import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import Hero from '../sections/hero'
import Testimonial from '../sections/testimonial'
import Grid from '../sections/grid'
import Newsletter from '../sections/newsletter'


const DefaultComponent = () => {
  return (
    <>     
        <Navbar />
            <div className="container mx-auto flex-grow">
                <Hero />
            </div>
            <div className="container mx-auto flex-grow">
                <Grid />
            </div>

            {/* Testimonial Section */}
            <div className="container mx-auto flex-grow">
                <Testimonial />
            </div>
            {/* Newsletter Section */}
            <div className="container mx-auto flex-grow py-16">
                <Newsletter />
            </div>

        <Footer />
    </>
  )
}

export default DefaultComponent