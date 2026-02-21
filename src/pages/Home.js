import React from 'react';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import ConsultationForm from '../components/sections/ConsultationForm';
import BlogPreview from '../components/sections/BlogPreview';
import Newsletter from '../components/sections/Newsletter';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <ConsultationForm />
      <BlogPreview />
      <Newsletter />
    </>
  );
};

export default Home;
