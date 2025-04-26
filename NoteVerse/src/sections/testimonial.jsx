import React from 'react';
import Logo from '../assets/logo.png'; // Update this path
import Avatar from '../assets/icon-avatar.png';


const Testimonial = () => {
return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 opacity-20" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
            <img
                alt="NoteVerse Logo"
                src={Logo} // Update this path
                className="mx-auto h-32"
            />
            <figure className="mt-10">
                <blockquote className="text-center text-xl/8 font-semibold text-white sm:text-2xl/9">
                    <p>
                        “NoteVerse completely changed the way I organize my study materials.
                        <br />
                        It's intuitive, fast, and keeps everything perfectly organized!”
                    </p>
                </blockquote>
                <figcaption className="mt-10">
                    <img
                        alt="Alex Johnson Avatar"
                        src={Avatar} // Update this path
                        className="mx-auto w-10 h-10 rounded-full border-2 border-black bg-white object-cover"
                    />
                    <div className="mt-4 flex flex-col items-center justify-center space-y-2 text-base">
    <div className="font-semibold text-white">Alex Johnson</div>
    <div className="text-gray-500">Computer Science Student</div>
    <div className="text-white">Student at XYZ University</div>
</div>
                </figcaption>
            </figure>
        </div>
    </section>
);
};

export default Testimonial;
