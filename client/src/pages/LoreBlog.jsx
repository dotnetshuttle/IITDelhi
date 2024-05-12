import React from "react";
import { HomePageHeader } from "../components/HomePageHeader";
import { GoClock } from "react-icons/go";

export const LoreBlog = () => {
  return (
    <div>
      <HomePageHeader />
      <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/blogpageimg.png')] w-full h-screen bg-no-repeat bg-center bg-cover "></div>
      <div class="flex flex-col items-center justify-center mt-20">
        <div class="w-2/3 flex flex-col items-center ">
          <div class="flex items-start mt-4">
            <span class="text-[#EDC16A]">Lifestyle</span>
            <span class="text-[#EDC16A] ml-2">Travel</span>
            <span class="text-[#EDC16A] ml-2">Arabic Nights</span>
          </div>
          <h1 className="flex text-center font-bold text-4xl mt-5">
            The Essential Guide to Design{" "}
          </h1>
          <p className="flex text-center mt-3 text-gray-600">
            As in any design team, the tools we use reflect not only our work
            but, <br /> above all, our process and the way we collabrate
          </p>
          <p className="flex text-center mt-10 text-xl ">
            As in any design team, the tools we use reflect not only our work
            but, above all, our process and the way we collabrate, the tools we
            use reflect not only our work but,{" "}
          </p>
          <p className="flex text-center mt-10  ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            tempor iaculis odio sed laoreet. Maecenas quis ligula facilisis,
            tristique mi et, lobortis elit. Nullam tempor nibh ut consectetur
            malesuada. Aenean commodo eros turpis, in vulputate nibh efficitur
            bibendum. Fusce placerat ullamcorper mauris, sit amet vulputate enim
            vulputate sed. In sed ex sapien. Morbi vitae elit sodales, rhoncus
            lacus quis, luctus elit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nullam tempor iaculis odio sed laoreet. Maecenas
            quis ligula facilisis, tristique mi et, lobortis elit. Nullam tempor
            nibh ut consectetur malesuada. Aenean commodo eros turpis, in
            vulputate nibh efficitur bibendum. Fusce placerat ullamcorper
            mauris, sit amet vulputate enim vulputate sed. In sed ex sapien.
            Morbi vitae elit sodales, rhoncus lacus quis, luctus elit.
          </p>
          <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/blogpageimg.png')] w-full h-screen bg-no-repeat bg-center bg-cover "></div>
          <p className="flex text-center mt-10  ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            tempor iaculis odio sed laoreet. Maecenas quis ligula facilisis,
            tristique mi et, lobortis elit. Nullam tempor nibh ut consectetur
            malesuada. Aenean commodo eros turpis, in vulputate nibh efficitur
            bibendum. Fusce placerat ullamcorper mauris, sit amet vulputate enim
            vulputate sed. In sed ex sapien. Morbi vitae elit sodales, rhoncus
            lacus quis, luctus elit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Nullam tempor iaculis odio sed laoreet. Maecenas
            quis ligula facilisis, tristique mi et, lobortis elit. Nullam tempor
            nibh ut consectetur malesuada. Aenean commodo eros turpis, in
            vulputate nibh efficitur bibendum. Fusce placerat ullamcorper
            mauris, sit amet vulputate enim vulputate sed. In sed ex sapien.
            Morbi vitae elit sodales, rhoncus lacus quis, luctus elit.
          </p>
          <p className="flex text-center mt-10  ">
            Morbi scelerisque ligula sed dignissim blandit. Curabitur porta
            lorem id fermentum tincidunt. Ut ultricies nisl vel purus commodo,
            eu ultricies leo porttitor. Sed vel blandit libero. Curabitur
            ullamcorper odio eros, vel hendrerit enim dignissim eget. Orci
            varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Duis dui ligula, tristique et sollicitudin in,
            ultricies quis augue. Proin pellentesque tortor ligula, nec
            tincidunt nibh dignissim id. Class aptent taciti sociosqu ad litora
            torquent per conubia nostra, per inceptos himenaeos. Proin et felis
            sed neque varius laoreet. Vestibulum mollis velit eu nulla egestas
            facilisis. Fusce lacinia scelerisque viverra. In lacinia rhoncus
            odio,
          </p>
          <div className="bg-[url('https://gyde-webapp-reactjs.onrender.com/yellowline.png')] w-full h-0.5 bg-no-repeat bg-center bg-cover mt-10 "></div>
        </div>
        {/* About Writer  */}
        <div className="flex flex-row justify-start items-start mt-10 mb-2">
          <div className="w-20 h-20 bg-[url('https://gyde-webapp-reactjs.onrender.com/writerimg.png')] bg-contain bg-center bg-no-repeat rounded-xl"></div>

          <div className="flex flex-col  ml-8">
            <div className="flex  mt-1">
              <ul className="flex ">
                <li className="text-[#EDC16A] text-2xl ">Aakarshan Saxenda</li>
              </ul>
            </div>
            <p className="text">
              New Delhi | Adventure, Culture, Luxury, Nightlife, Nature
            </p>
          </div>
        </div>
        {/* Related Blog section */}
        <div className="flex justify-between items-center mt-20 ">
          <div className="flex flex-col justify-between items-center w-2/5">
            <div className="w-96 h-80 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg3.png')] bg-center bg-no-repeat rounded-lg"></div>
            <div className="flex flex-col items-start  ml-14">
              <div className="flex items-start mt-4">
                <span className="text-[#EDC16A]">Lifestyle</span>
                <span className="text-[#EDC16A] ml-2">Travel</span>
                <span className="text-[#EDC16A] ml-2">Arabic Nights</span>
                <span className="flex ml-24 text-gray-300">
                  <GoClock className="flex m-1 " />6 min
                </span>
              </div>

              <p className="text-xl">
                Nature is replenshing itself during Covid Lockdown
              </p>
              <p className="text-gray-600 mt-4">
                By understanding how different psychology principles influence
                human behavior, we can build solutions that resolve users'
                problems.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center w-2/5">
            <div className="w-96 h-80 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg3.png')] bg-center bg-no-repeat rounded-lg"></div>
            <div className="flex flex-col items-start  ml-14">
              <div className="flex items-start mt-4">
                <span className="text-[#EDC16A]">Lifestyle</span>
                <span className="text-[#EDC16A] ml-2">Travel</span>
                <span className="text-[#EDC16A] ml-2">Arabic Nights</span>
                <span className="flex ml-24 text-gray-300">
                  <GoClock className="flex m-1 " />6 min
                </span>
              </div>

              <p className="text-xl">
                Nature is replenshing itself during Covid Lockdown
              </p>
              <p className="text-gray-600 mt-4">
                By understanding how different psychology principles influence
                human behavior, we can build solutions that resolve users'
                problems.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center w-2/5">
            <div className="w-96 h-80 bg-[url('https://gyde-webapp-reactjs.onrender.com/loreblogimg3.png')] bg-center bg-no-repeat rounded-lg"></div>
            <div className="flex flex-col items-start  ml-14">
              <div className="flex items-start mt-4">
                <span className="text-[#EDC16A]">Lifestyle</span>
                <span className="text-[#EDC16A] ml-2">Travel</span>
                <span className="text-[#EDC16A] ml-2">Arabic Nights</span>
                <span className="flex ml-24 text-gray-300">
                  <GoClock className="flex m-1 " />6 min
                </span>
              </div>

              <p className="text-xl">
                Nature is replenshing itself during Covid Lockdown
              </p>
              <p className="text-gray-600 mt-4">
                By understanding how different psychology principles influence
                human behavior, we can build solutions that resolve users'
                problems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
