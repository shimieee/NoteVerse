import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const Page404 = () => {
return (
    <>
    <Navbar />
    <main class="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
            <div class="text-center flex flex-col justify-center min-h-screen">
                    <p class="text-base font-semibold text-pink-300">404</p>
                    <h1 class="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">Page not found</h1>
                            <p class="mt-6 text-lg font-medium text-pretty text-gray-200 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
                                    <div class="mt-10 flex items-center justify-center gap-x-6">
                                            <a href="/" class="rounded-md bg-pink-200 px-3.5 py-2.5 text-m font-semibold text-black shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</a>
                                            <a href="#" class="text-m font-semibold text-gray-300">Contact support <span aria-hidden="true">&rarr;</span></a>
                                     </div>
            </div>
    </main>
    <Footer />
</>
)
}

export default Page404