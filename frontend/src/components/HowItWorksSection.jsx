import React from 'react';
import { FaSignInAlt, FaLightbulb, FaPlaneDeparture } from 'react-icons/fa';

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="min-h-[100svh] bg-[#020817e6] w-full flex justify-center items-center px-5 md:px-0 py-10 md:py-0 text-white"
    >
      <div className="flex flex-col gap-20">
        {/* Section Heading */}
        <section className="flex flex-col gap-5">
          <h2 className="text-blue-500 text-center text-lg font-bold tracking-wide">How it works?</h2>
          <h3 className="text-foreground text-center md:text-3xl text-xl font-bold">
            Craft Your Ideal Journey Swiftly
          </h3>
        </section>

        {/* Steps */}
        <section className="flex items-center justify-center gap-28 w-full h-full flex-col md:flex-row">
          {/* Step 1 */}
          <article className="flex flex-col items-center justify-center gap-5 relative">
            <div className="bg-[#1e293b] w-24 h-24 rounded-2xl shadow-2xl flex items-center justify-center">
              <FaSignInAlt className="h-8 w-8 text-blue-500 dark:text-foreground" />
            </div>
            <span className="font-bold tracking-wide text-lg mt-5">Login</span>
            <span className="text-sm w-2/3 text-center text-muted-foreground">
              Log in to start your journey.
            </span>
          </article>

          {/* Step 2 */}
          <article className=" flex flex-col items-center justify-center gap-5 relative">
            <div className="bg-[#1e293b] w-24 h-24 rounded-2xl shadow-2xl flex items-center justify-center">
              <FaLightbulb className="h-8 w-8 text-blue-500 dark:text-foreground" />
            </div>
            <span className="font-bold tracking-wide text-lg mt-5">Key in the travel idea</span>
            <span className="text-sm w-2/3 text-center text-muted-foreground">
              Tell us about your ideal trip.
            </span>
          </article>

          {/* Step 3 */}
          <article className="flex flex-col items-center justify-center gap-5 relative">
            <div className="bg-[#1e293b] w-24 h-24 rounded-2xl shadow-2xl flex items-center justify-center">
              <FaPlaneDeparture className="h-8 w-8 text-blue-500 dark:text-foreground" />
            </div>
            <span className="font-bold tracking-wide text-lg mt-5">Get AI Plan</span>
            <span className="text-sm w-2/3 text-center text-muted-foreground">
              Get your AI-driven tailored travel plan.
            </span>
          </article>
        </section>
      </div>
    </section>
  );
}

export default HowItWorksSection;
