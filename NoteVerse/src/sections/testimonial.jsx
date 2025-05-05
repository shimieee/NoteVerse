import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.png';
import Avatar from '../assets/icon-avatar.png';
import { StarIcon } from '@heroicons/react/20/solid';

const testimonials = [
  {
    id: 1,
    name: 'Alex Johnson',
    role: 'Computer Science Student',
    university: 'XYZ University',
    content: 'NoteVerse completely changed the way I organize my study materials. It\'s intuitive, fast, and keeps everything perfectly organized!',
    rating: 5,
    avatar: Avatar
  },
  {
    id: 2,
    name: 'Sarah Chen',
    role: 'Medical Student',
    university: 'ABC Medical School',
    content: 'The collaborative features are amazing! I can share notes with my study group and we can all contribute to creating the perfect study materials.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    name: 'Michael Rodriguez',
    role: 'Engineering Student',
    university: 'DEF Institute of Technology',
    content: 'The search functionality is a game-changer. I can find any note instantly, and the organization system makes it so easy to keep track of everything.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
  }
];

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#1E1E1E] px-6 py-24 sm:py-32 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20" />
      </div>

      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <img
          alt="NoteVerse Logo"
          src={Logo}
          className="mx-auto h-32"
        />
        
        <div className="mt-16 flow-root sm:mt-24">
          <div className="relative">
            {/* Testimonial content */}
            <div className="relative overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out"
                   style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0">
                    <figure className="mx-auto max-w-2xl">
                      <blockquote className="text-center text-xl font-semibold leading-8 text-white sm:text-2xl sm:leading-9">
                        <p>"{testimonial.content}"</p>
                      </blockquote>
                      <figcaption className="mt-10">
                        <div className="flex items-center justify-center gap-x-6">
                          <img
                            className="h-14 w-14 rounded-full bg-gray-800 object-cover"
                            src={testimonial.avatar}
                            alt={testimonial.name}
                          />
                          <div>
                            <div className="text-base font-semibold text-white">{testimonial.name}</div>
                            <div className="text-sm leading-6 text-gray-400">{testimonial.role}</div>
                            <div className="text-sm leading-6 text-gray-400">{testimonial.university}</div>
                            <div className="mt-1 flex items-center justify-center">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <button
                onClick={prevTestimonial}
                className="rounded-full bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-pink-200' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="rounded-full bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
