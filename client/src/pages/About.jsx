import { HomePageHeader } from "../components/HomePageHeader";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    hidden: { y: "100vh", x: "-50%" },
    visible: {
      y: "200px",
      x: "-50%",
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };
  return (
    <>
      <div>
        <HomePageHeader />{" "}
        <div className="flex flex-col gap-6 p-2 mx-auto bg-[url('https://gyde-webapp-reactjs.onrender.com/exploreusbgimg.svg')] w-full h-screen bg-no-repeat bg-center bg-cover">
          <div className="flex flex-col mt-40 mx-auto justify-center items-center">
            <h1 className="text-white text-xl lg:text-6xl p-4">
              Welcome to <span className="text-[#EDC16A] ">Gyde </span>
            </h1>
            <div className=" bg-[url('https://gyde-webapp-reactjs.onrender.com/exploreustext.png')] w-[700px] h-[100px] bg-no-repeat bg-center bg-contain"></div>
          </div>
        </div>
        <p className=" mx-28 text-xl">
          “At Gyde, we are more than a travel platform, we're your gateway to
          truly authentic journeys. We've taken the essence of travel and
          transformed it into something more profound, more personal, and
          infinitely more rewarding. Our mission is rooted in a simple yet
          powerful idea: to reimagine experiences for those who wander”
        </p>
        <div className="text-center text-white mb-10 mt-20">
          <h1 className="text-white text-2xl  p-4">
            Why <span className="text-[#EDC16A] ">Gyde? </span>
          </h1>
          <h1 className="text-white text-3xl  p-4">
            Because We Know the Value of Authenticity
          </h1>
        </div>
        <div className="flex flex-row justify-center m-4 gap-4 text-white">
          <div className=" flex flex-col text-center w-1/4 items-center">
            <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/homeimg3.jpeg')] w-64 h-80 bg-contain bg-center bg-no-repeat "></div>
            <h2 className="mt-4">Your Local Friend, Anywhere</h2>
            <p className="mt-2 text-sm">
              Imagine landing in any city and meeting a friend who knows it
              inside out. That's Gyde. Our network of local Gydes ensures you're
              not just visiting; you're experiencing. From hidden gems to local
              favorites, your journey is personal, packed with stories waiting
              to be discovered.
            </p>
          </div>
          <div className="flex flex-col text-center w-1/4 items-center">
            <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/homeimg3.jpeg')] w-64 h-80 bg-contain bg-center bg-no-repeat"></div>
            <h2 className="mt-4">Tailored Journeys, Just for You</h2>
            <p className="mt-2 text-sm">
              Forget one-size-fits-all itineraries. Gyde listens to your
              preferences, passions, and needs, crafting journeys that resonate
              with your spirit of adventure. Whether you crave culinary
              delights, art, history, nightlife or the thrill of the unknown, we
              customize your experience to match your unique taste.
            </p>
          </div>
          <div className="flex flex-col text-center w-1/4 items-center">
            <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/homeimg3.jpeg')] w-64 h-80 bg-contain bg-center bg-no-repeat"></div>
            <h2 className="mt-4">Safe and Sound, With a Local’s Touch</h2>
            <p className="mt-2 text-sm">
              Travel with peace of mind knowing each Gyde is thoroughly vetted.
              Safety, authenticity, and trust form the pillars of your journey,
              allowing you to explore with confidence.
            </p>
          </div>
        </div>
        <div className="flex mt-16 justify-center items-center bg-[url('https://gyde-webapp-reactjs.onrender.com/homegydebgimg.png')] w-full h-screen bg-no-repeat bg-center bg-cover">
          <h1 className=" flex text-4xl w-1/2 m-10 mb-52">
            Are you ready to explore the true essence of places, guided by those
            who call it home?{" "}
          </h1>

          <div className="flex w-1/3 ml-10 mb-52">
            <div
              className=" flex flex-col mt-20 h-fit p-6 rounded-lg"
              style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
            >
              <h1 className=" text-2xl m-2">Explore confidently with Gyde</h1>
              <div className="w-full h-[0px] border border-orange-300"></div>
              <p className="text-sm mt-4 ml-2">
                Where unforgettable experiences await, ensuring you never miss
                out on incredible adventures again.
              </p>

              <button className="bg-[#EDC16A] text-black p-2 text-sm rounded-2xl w-32 mt-10 mb-3">
                Get started
              </button>
            </div>
          </div>
        </div>
        <div className="text-center text-white mb-10">
          <h1 className="text-white text-3xl mt-20 p-4">Meet the Team</h1>
          <h1 className="text-white text-2xl  p-4">
            Get to know the people leading the way at{" "}
            <span className="text-[#EDC16A] ">Gyde? </span>
          </h1>
        </div>
        <div className="flex flex-row justify-center m-4 gap-4 text-white">
          <div className="text-center">
            <div className="bg-[url('aakarshan_pfp.png')] w-64 h-80 bg-contain bg-center bg-no-repeat"></div>
            <h2 className="mt-4 font-bold text-lg">Aakarshan Saxena</h2>
            <p className="mt-2 ">CEO</p>
          </div>
          <div className="text-center">
            <div className="bg-[url('navdeep_pfp.png')] w-64 h-80 bg-contain bg-center bg-no-repeat "></div>
            <h2 className="mt-4 font-bold text-lg">Navdeep Chobhiyal</h2>
            <p className="mt-2 ">CBO</p>
          </div>
          <div className="text-center">
            <div className="bg-[url('chandan_pfp.png')] w-64 h-80 bg-contain bg-center bg-no-repeat"></div>
            <h2 className="mt-4 font-bold text-lg">Chandan Kumar</h2>
            <p className="mt-2 ">COO</p>
          </div>
          <div className="text-center">
            <div className="bg-[url('aaryan_pfp.png')] w-64 h-80 bg-contain bg-center bg-no-repeat"></div>
            <h2 className="mt-4 font-bold text-lg">Aaryan Auliya</h2>
            <p className="mt-2 ">VP, Gyde Memories</p>
          </div>
        </div>
        <div
          className="relative w-full h-screen bg-[url('https://gyde-webapp-reactjs.onrender.com/homeanimation.png')] bg-no-repeat bg-center bg-cover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Motion component for animated image */}
          <motion.div
            className="absolute w-96 h-14 top-0 left-1/2 transform -translate-x-1/2 bg-[url('https://gyde-webapp-reactjs.onrender.com/homeanimationtext.png')] bg-no-repeat bg-center bg-cover"
            variants={variants}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
          />
        </div>
      </div>
    </>
  );
}
