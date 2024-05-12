const Pricing = () => {
  const cardData = [
    {
      title: "Basic Package",
      price: "30,000",
      features: ["Ideal for local campaigns starting at"],
    },
    {
      title: "Premium Package",
      price: "100,000",
      features: ["For prime location with maximum exposure, starting at"],
    },
    {
      title: "Custom Package",
      features: [
        "Tailored solutions for a campaign that meets your specific needs.",
      ],
    },
  ];
  //
  return (
    <>
      <div className="bg-[url('https://mern-estate-uzdz.onrender.com/pricing.png')] w-full py-[10rem] px-4 bg-no-repeat">
        <div className="z-10 flex justify-center mt-20">
          <h2 className=" text-white text-4xl">Pricing</h2>
        </div>

        <div className="w-full py-[5rem] px-4 mt-10  ">
          {/* <div className="flex justify-center ">
            <h2 className="text-3xl">Pricing Packages</h2>
          </div> */}
          <div className=" max-w-[1240px] mx-auto grid md:grid-cols-3 gap-6 p-20 bg-white rounded-3xl shadow-xl">
            {/* Card 1 */}
            <div className="w-full shadow-xl flex flex-col my-6 rounded-lg hover:scale-105 duration-300">
              <h2 className="text-2xl text-white uppercase bg-[#073A71] text-center py-6 w-full rounded-t-3xl">
                {cardData[0].title}
              </h2>

              <div className="text-center font-medium">
                {cardData[0].features.map((feature, index) => (
                  <p key={index} className={"text-xl mb-3 p-5"}>
                    {feature}
                  </p>
                ))}
              </div>
              <div className="flex flex-row justify-center">
                <span className="text-center mt-2 ml-2">₹</span>
                <p className="text-center text-4xl font-bold m-3">
                  {cardData[0].price}{" "}
                </p>
                <span className="text-center mt-4"> per month </span>
              </div>
              <button className="border border-black rounded-3xl p-2 mt-4 w-1/2 mx-auto">
                Get Started
              </button>
            </div>

            {/* Card 2 */}
            <div className="w-full shadow-xl flex flex-col my-6 rounded-lg hover:scale-105 duration-300 pb-5">
              <h2 className="text-2xl text-white uppercase bg-[#40C6EC] text-center py-6 w-full rounded-t-3xl">
                {cardData[1].title}
              </h2>

              <div className="text-center font-medium">
                {cardData[1].features.map((feature, index) => (
                  <p key={index} className={"text-xl mb-3 p-5"}>
                    {feature}
                  </p>
                ))}
              </div>
              <div className="flex flex-row justify-center">
                <span className="text-center mt-2 ml-2">₹</span>
                <p className="text-center text-4xl font-bold m-3">
                  {cardData[1].price}{" "}
                </p>
                <span className="text-center mt-4"> per month </span>
              </div>
              <button className="border border-black rounded-3xl p-2 m-2 w-1/2 mx-auto">
                Get Started
              </button>
            </div>

            {/* Card 3 */}
            <div className="w-full shadow-xl flex flex-col my-6 rounded-lg hover:scale-105 duration-300">
              <h2 className="text-2xl text-white uppercase bg-[#073A71] text-center py-6 w-full rounded-t-3xl">
                {cardData[2].title}
              </h2>

              <div className="text-center font-medium mt-8">
                {cardData[2].features.map((feature, index) => (
                  <p key={index} className={"text-xl mb-3 p-5"}>
                    {feature}
                  </p>
                ))}
              </div>
              <button className="border border-black rounded-3xl p-2 m-2 w-1/2 mx-auto">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
