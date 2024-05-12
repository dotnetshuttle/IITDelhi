import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { motion } from "framer-motion";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  const [isHovered, setIsHovered] = useState(false);

  const variants = {
    hidden: { y: "100vh", x: "-10%" },
    visible: {
      y: "-200px",
      x: "-10%",
      transition: { type: "spring", stiffness: 100, damping: 20 },
    },
  };
  return (
    <div className="flex min-h-screen ">
      {/* Animated image on the left */}
      <div
        className="w-1/2 flex justify-center items-center bg-[url('https://gyde-webapp-reactjs.onrender.com/homeanimation.png')] bg-no-repeat bg-center bg-cover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="w-[500px] h-[100px] bg-[url('https://gyde-webapp-reactjs.onrender.com/homeanimationtext.png')] bg-no-repeat bg-center bg-contain"
          variants={variants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
        />
      </div>

      {/* Sign-up form on the right */}
      <div className="w-1/2 flex flex-col justify-center p-4 bg-white text-black rounded-l-3xl">
        <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border p-3 rounded-lg"
            id="username"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border p-3 rounded-lg"
            id="phonenumber"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <OAuth />
        </form>
        <div className="flex gap-2 mt-5">
          <p>Have an account?</p>
          <Link to={"/sign-in"}>
            <span className="text-blue-700">Sign in</span>
          </Link>
        </div>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      </div>
    </div>
  );
}
