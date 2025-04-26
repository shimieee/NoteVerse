import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import About3 from '../assets/about3.jpg'
import About2 from '../assets/about2.jpg'
import { ArrowRightCircleIcon } from '@heroicons/react/20/solid'

const About = () => {
  return (
    <>
    <Navbar />
    <section class="py-24 relative">
        <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div class="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
                <div
                    class="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
                    <div class="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                        <img class=" rounded-xl object-cover" src={About2} alt="about Us image" />
                    </div>
                    <img class="sm:ml-0 ml-auto rounded-xl object-cover" src={About2}
                        alt="about Us image" />
                </div>
                <div class="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                    <div class="w-full flex-col justify-center items-start gap-8 flex">
                        <div class="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                            <h2
                                class="text-pink-300 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                Empowering Each Other to Succeed!</h2>
                            <p class="text-gray-300 text-base font-normal leading-relaxed lg:text-start text-center">
                               Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sapiente non harum assumenda praesentium quo aspernatur incidunt dolor eligendi, autem omnis quidem itaque sed aut nulla error labore. Repellat, optio. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea minus nihil laudantium minima, illo tempora facere aliquam. Accusamus mollitia id in, eveniet fuga doloribus odio cum, ipsum quibusdam sint fugiat.</p>
                        </div>
                        <div class="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                            <div class="flex-col justify-start items-start inline-flex">
                                <h3 class="text-pink-300 text-4xl font-bold font-manrope leading-normal">33+</h3>
                                <h6 class="text-gray-200 text-base font-normal leading-relaxed">Years of Experience</h6>
                            </div>
                            <div class="flex-col justify-start items-start inline-flex">
                                <h4 class="text-pink-200 text-4xl font-bold font-manrope leading-normal">125+</h4>
                                <h6 class="text-gray-200 text-base font-normal leading-relaxed">Successful Projects</h6>
                            </div>
                            <div class="flex-col justify-start items-start inline-flex">
                                <h4 class="text-pink-800 text-4xl font-bold font-manrope leading-normal">52+</h4>
                                <h6 class="text-gray-200 text-base font-normal leading-relaxed">Happy Clients</h6>
                            </div>
                        </div>
                    </div>
                    <button
                        class="sm:w-fit w-full px-3.5 py-2 bg-pink-900 hover:bg-pink-800 transition-all duration-700 ease-in-out rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] justify-center items-center flex">
                        <span class="px-2 py-1 text-white text-xl font-medium leading-6">Read More</span> <ArrowRightCircleIcon className="h-7 w-7" ></ArrowRightCircleIcon>
                    </button>
                </div>
            </div>
        </div>
    </section>
    <section class="py-24 relative xl:mr-0 lg:mr-5 mr-0">
        <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
            <div class="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
                <div class="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                    <div class="w-full flex-col justify-center items-start gap-8 flex">
                        <div class="flex-col justify-start lg:items-start items-center gap-4 flex">

                            <div class="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                                <h2
                                    class="text-pink-600 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                    The Tale of Our Achievement Story</h2>
                                <p
                                    class="text-gray-300 text-base font-normal leading-relaxed lg:text-start text-center">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque reprehenderit ut mollitia nostrum amet recusandae, error velit quod exercitationem nesciunt eveniet impedit, iste rerum repellendus, voluptate aspernatur corporis harum? Tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Id vel quis voluptate quaerat recusandae? Laborum ipsam totam odit veniam possimus recusandae sint, fugiat perspiciatis aliquid deserunt dicta quae doloribus itaque! lo</p>
                            </div>
                        </div>
                        <div class="w-full flex-col justify-center items-start gap-6 flex">
                            <div class="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                                <div
                                    class="w-full h-full p-3.5 bg-gray-300 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                    <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">33+ Years</h4>
                                    <p class="text-gray-500 text-base font-normal leading-relaxed">Influencing Digital
                                        Landscapes Together</p>
                                </div>
                                <div
                                    class="w-full h-full  p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                    <h4 class="text-pink-200 text-2xl font-bold font-manrope leading-9">125+ Projects
                                    </h4>
                                    <p class="text-white text-base font-normal leading-relaxed">Excellence Achieved
                                        Through Success</p>
                                </div>
                            </div>
                            <div class="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                                <div
                                    class="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                    <h4 class="text-pink-500 text-2xl font-bold font-manrope leading-9">26+ Awards</h4>
                                    <p class="text-white text-base font-normal leading-relaxed">Our Dedication to
                                        Innovation Wins Understanding</p>
                                </div>
                                <div
                                    class="w-full h-full p-3.5 bg-gray-300 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                                    <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">99% Happy
                                        Clients</h4>
                                    <p class="text-gray-500 text-base font-normal leading-relaxed">Mirrors our Focus on
                                        Client Satisfaction.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        class="sm:w-fit w-full group px-3.5 py-2 bg-pink-200 hover:bg-indigo-100 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
                        <span
                            class="px-1.5 text-black text-m font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">Read
                            More</span>
                        <svg class="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out"
                            xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996" stroke="#4F46E5" stroke-width="1.6"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                </div>
                <div class="w-full lg:justify-start justify-center items-start flex">
                    <div
                        class="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
                        <img class="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                            src={About3} alt="about Us image" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer />
    </>
  )
}

export default About