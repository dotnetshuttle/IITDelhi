import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="m-12 bg-[#160d19] flex flex-col md:flex-row items-center justify-center text-gray-600">
        <div className="flex-1 flex gap-3.5 mb-6 md:mb-0 md:mr-10 items-center ">
          <Link to="/">
            <div
              className="bg-[url('https://gyde-webapp-reactjs.onrender.com/footerlogo.png')] w-52 h-52 bg-center  bg-no-repeat"
              style={{ marginLeft: "-1rem" }}
            ></div>
          </Link>
          <div
            className="bg-[url('https://gyde-webapp-reactjs.onrender.com/footertext.png')] w-96 h-16 bg-no-repeat"
            style={{ marginLeft: "-1rem" }}
          ></div>
        </div>
        <div className="flex flex-1 flex-wrap justify-center  gap-10 text-white">
          <div className="flex flex-col gap-2.5 mr-20 font-light items-center ">
            <span className="font-bold">Company</span>
            <a href="/">Explore Us</a>
            <a href="/lore">Explore Lores</a>
            <a href="/">Explore life (Career) </a>
            <a href="/">Contact Us</a>
          </div>
          <div className="flex flex-col gap-2.5 font-light items-center ">
            <span className="font-bold">Destinations</span>
            <a href="/">Delhi</a>
            <a href="/">Goa</a>
            <a href="/">Himachal Pradesh</a>
            <a href="/">Uttarakhand</a>
          </div>
        </div>
      </div>
      <div className=" m-5 bg-[#160d19] bg-[url('https://gyde-webapp-reactjs.onrender.com/footerline.png')] w-screen h-[1px] bg-center bg-cover bg-no-repeat"></div>
      <div className="flex items-center bg-[#160d19] justify-center text-center text-white mb-20">
        <p>
          Copyright Operation Sapiens Pvt.Ltd.
          <br /> All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
